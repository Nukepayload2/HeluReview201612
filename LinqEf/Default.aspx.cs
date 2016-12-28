using LinqEf.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace LinqEf
{
    public partial class Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                using (var db = new SampleData())
                {
                    if (!db.Product.Any())
                    {
                        for (int i = 0; i < 5; i++)
                        {
                            db.Product.Add(new Product() { Stock = i * 10 + 213, Price = i * 200, ProductName = "示例产品" + i });
                        }
                    }
                    db.SaveChanges();
                }
            }
        }

        protected void BtnQuery_Click(object sender, EventArgs e)
        {
            using (var db = new SampleData())
            {
                try
                {
                    var result = (from p in db.Product
                                  where p.ProductName == TxtProductName.Text
                                  select p).ToArray();
                    foreach (var item in result)
                    {
                        Response.Write($"价格：{item.Price}, 存货 {item.Stock}<br/>");
                    }
                }
                catch (Exception ex)
                {
                    Response.Write($"查询出错: {ex.Message}<br/>");
                    throw;
                }
            }
        }
    }
}