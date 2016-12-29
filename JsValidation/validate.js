function isNullOrWhitespace(val)
{
    return val == undefined || val.trim().length == 0;
}
function validate()
{
    var txtName = document.getElementById("txtName");
    var txtAge = document.getElementById("txtAge");
    var txtMail = document.getElementById("txtMail");
    var lstGrade = document.getElementById("lstGrade");
    var canSubmit = false;
    if (isNullOrWhitespace(txtName.value))
    {
        tblError.innerText = "姓名不得为空";
    }
    else if (isNaN(txtAge.value) || txtAge.value < 10 || txtAge.value > 60)
    {
        tblError.innerText = "年龄不得为空且必须在 10-60 之间";
    }
    else if (! /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(txtMail.value))
    {
        tblError.innerText = "请输入正确的电子邮件地址";
    }
    else if (isNaN(lstGrade.value) || lstGrade.value < 1)
    {
        tblError.innerText = "请选择年级";
    }
    else
    {
        canSubmit = true;
    }
    return canSubmit;
}