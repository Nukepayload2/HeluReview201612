using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;

namespace CookiesCartCs
{
    internal class CartViewModel
    {
        public static string[] Kinds { get; } = new string[] { "bread", "apple", "milk" };
        public List<CartItem> Items { get; } = new List<CartItem>();
        const string CartState = "__CARTSTATE";
        JavaScriptSerializer json = new JavaScriptSerializer();

        public CartViewModel()
        {
            var context = HttpContext.Current;
            var req = context.Request;
            var state = req.Cookies[CartState]?.Value;
            if (!string.IsNullOrEmpty(state))
            {
                Items.AddRange(json.Deserialize<CartItem[]>(state));
            }
        }

        public void Save()
        {
            var context = HttpContext.Current;
            var resp = context.Response;
            resp.SetCookie(new HttpCookie(CartState, json.Serialize(Items)) { Expires = DateTime.Now.AddDays(1) });
        }

        public void Clear()
        {
            var context = HttpContext.Current;
            var resp = context.Response;
            resp.SetCookie(new HttpCookie(CartState, null) { Expires = DateTime.Parse("1 / 1 / 2000 12:00:00 AM") });
        }
    }
}