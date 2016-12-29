var Program = Simulations.Program;
window.addEventListener("load", function () {
    var btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", function () {
        System.Console.Clear();
        var txtP1 = document.getElementById("txtP1");
        var txtP2 = document.getElementById("txtP2");
        if (System.String.IsNullOrWhiteSpace(txtP1.value)) {
            System.Console.WriteLine("模拟启动失败：玩家1姓名不得为空");
        }
        else if (System.String.IsNullOrWhiteSpace(txtP2.value)) {
            System.Console.WriteLine("模拟启动失败：玩家2姓名不得为空");
        }
        else {
            Program.Main(txtP1.value, txtP2.value);
        }
    });
});
//# sourceMappingURL=index.html.js.map