namespace System
{
    export class Console
    {
        static WriteLine(str)
        {
            let output = document.getElementById("console");
            output.innerHTML += str + "<br/>";
        }
        static Clear()
        {
            let output = document.getElementById("console");
            output.innerHTML = "";
        }
    }
    export class String
    {
        static IsNullOrWhiteSpace(str: string)
        {
            return str == null || str.trim().length == 0;
        }
    }
}