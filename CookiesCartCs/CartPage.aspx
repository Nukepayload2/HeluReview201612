<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CartPage.aspx.cs" Inherits="CookiesCartCs.CartPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1>商店</h1>
            种类<br />
            <asp:ListBox ID="LstGoods" runat="server" Width="414px"></asp:ListBox>
            <br />
            数量<br />
            <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="TxtCount" ErrorMessage="至少买一个" ForeColor="Red" Operator="GreaterThan" ControlToCompare="TxtZero"></asp:CompareValidator>
            <asp:TextBox ID="TxtZero" runat="server" Text="0" Visible="False"></asp:TextBox>
            <br />
            <asp:TextBox ID="TxtCount" runat="server" Width="402px">1</asp:TextBox>
            <br />
            <asp:Button ID="BtnPurchase" runat="server" Text="买买买" Width="100px" OnClick="BtnPurchase_Click" />
            <br />
            <br />
            <h1>购物车</h1>
            <asp:ListBox ID="LstPurchased" runat="server" Width="406px">
            </asp:ListBox>
            <br />
            <asp:Button ID="BtnDeleteSelected" runat="server" Text="删除选定项" Width="100px" OnClick="BtnDeleteSelected_Click" />
            &nbsp;<asp:Button ID="BtnClear" runat="server" Text="清空" Width="100px" OnClick="BtnClear_Click" />
            <br />
            <br />
            修改选定的数量<br />
            <asp:TextBox ID="TxtModifyCount" runat="server"></asp:TextBox>
            <br />
            <asp:Button ID="BtnModifyCount" runat="server" Text="修改选定数量" Width="100px" OnClick="BtnModifyCount_Click" />
        </div>
    </form>
</body>
</html>
