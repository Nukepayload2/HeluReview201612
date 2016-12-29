import Program = Simulations.Program;

window.addEventListener("load", () =>
{
    let btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", () =>
    {
        System.Console.Clear();
        let txtP1 = <HTMLInputElement>document.getElementById("txtP1");
        let txtP2 = <HTMLInputElement>document.getElementById("txtP2");
        if (System.String.IsNullOrWhiteSpace(txtP1.value))
        {
            System.Console.WriteLine("模拟启动失败：玩家1姓名不得为空");
        }
        else if (System.String.IsNullOrWhiteSpace(txtP2.value))
        {
            System.Console.WriteLine("模拟启动失败：玩家2姓名不得为空");
        }
        else
        {
            Program.Main(txtP1.value, txtP2.value);
        }
    });
});