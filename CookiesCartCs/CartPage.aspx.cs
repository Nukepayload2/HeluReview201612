using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CookiesCartCs
{
    public partial class CartPage : Page
    {
        CartViewModel vm = new CartViewModel();

        protected void Page_Load(object sender, EventArgs e)
        {
            UnobtrusiveValidationMode = UnobtrusiveValidationMode.None;
            if (!IsPostBack)
            {
                LstGoods.Items.AddRange((from k in CartViewModel.Kinds select new ListItem(k)).ToArray());
                UpdatePurchased();
            }
        }

        private void UpdatePurchased()
        {
            LstPurchased.Items.Clear();
            LstPurchased.Items.AddRange((from k in vm.Items select new ListItem(k.ToString())).ToArray());
        }

        protected void BtnPurchase_Click(object sender, EventArgs e)
        {
            if (LstGoods.SelectedIndex >= 0)
            {
                var name = CartViewModel.Kinds[LstGoods.SelectedIndex];
                var existing = from item in vm.Items where item.Name == name select item;
                var count = 0;
                if (int.TryParse(TxtCount.Text, out count) && count > 0)
                {
                    if (existing.Any())
                    {
                        existing.First().Count += count;
                    }
                    else
                    {
                        vm.Items.Add(new CartItem
                        {
                            Name = name,
                            Count = count
                        });
                    }
                }
                vm.Save();
                UpdatePurchased();
            }
        }

        protected void BtnClear_Click(object sender, EventArgs e)
        {
            vm.Clear();
            LstPurchased.Items.Clear();
        }

        protected void BtnDeleteSelected_Click(object sender, EventArgs e)
        {
            if (LstPurchased.SelectedIndex >= 0)
            {
                vm.Items.RemoveAt(LstPurchased.SelectedIndex);
                vm.Save();
                UpdatePurchased();
            }
        }

        protected void BtnModifyCount_Click(object sender, EventArgs e)
        {
            if (LstPurchased.SelectedIndex >= 0)
            {
                var count = 0;
                if (int.TryParse(TxtModifyCount.Text, out count) && count > 0)
                {
                    vm.Items[LstPurchased.SelectedIndex].Count = count;
                    vm.Save();
                    UpdatePurchased();
                }
            }
        }
    }
}