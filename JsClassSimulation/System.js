var System;
(function (System) {
    var Console = (function () {
        function Console() {
        }
        Console.WriteLine = function (str) {
            var output = document.getElementById("console");
            output.innerHTML += str + "<br/>";
        };
        Console.Clear = function () {
            var output = document.getElementById("console");
            output.innerHTML = "";
        };
        return Console;
    }());
    System.Console = Console;
    var String = (function () {
        function String() {
        }
        String.IsNullOrWhiteSpace = function (str) {
            return str == null || str.trim().length == 0;
        };
        return String;
    }());
    System.String = String;
})(System || (System = {}));
//# sourceMappingURL=System.js.map