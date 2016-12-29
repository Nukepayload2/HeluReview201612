var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Simulations;
(function (Simulations) {
    var Task = System.Threading.Tasks.Task;
    var Unit = (function () {
        function Unit(strength, name) {
            this._Strength = strength;
            this.Health = strength;
            this.Name = name;
        }
        Object.defineProperty(Unit.prototype, "Strength", {
            get: function () {
                return this._Strength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Unit.prototype, "Health", {
            get: function () {
                return this._Health;
            },
            set: function (val) {
                this._Health = val;
                if (val <= 0) {
                    this.UnitLost();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Unit.prototype, "IsAlive", {
            get: function () {
                return this.Health > 0;
            },
            enumerable: true,
            configurable: true
        });
        Unit.prototype.UnitLost = function () {
            System.Console.WriteLine("单位 " + this.Name + " 阵亡");
        };
        return Unit;
    }());
    var UnitOperations = (function () {
        function UnitOperations() {
        }
        UnitOperations.Fight = function (unit1, unit2) {
            var damage = Math.min(unit1.Strength, unit2.Strength);
            unit1.Health -= damage;
            unit2.Health -= damage;
        };
        return UnitOperations;
    }());
    var Tank = (function (_super) {
        __extends(Tank, _super);
        function Tank() {
            return _super.apply(this, arguments) || this;
        }
        return Tank;
    }(Unit));
    var HammerTank = (function (_super) {
        __extends(HammerTank, _super);
        function HammerTank() {
            return _super.call(this, 1000, "铁锤坦克") || this;
        }
        return HammerTank;
    }(Tank));
    var TsunamiTank = (function (_super) {
        __extends(TsunamiTank, _super);
        function TsunamiTank() {
            return _super.call(this, 900, "海啸坦克") || this;
        }
        return TsunamiTank;
    }(Tank));
    var Infantry = (function (_super) {
        __extends(Infantry, _super);
        function Infantry() {
            return _super.apply(this, arguments) || this;
        }
        return Infantry;
    }(Unit));
    var Conscript = (function (_super) {
        __extends(Conscript, _super);
        function Conscript() {
            return _super.call(this, 240, "动员兵") || this;
        }
        return Conscript;
    }(Infantry));
    var Warrior = (function (_super) {
        __extends(Warrior, _super);
        function Warrior() {
            return _super.call(this, 300, "帝国武士") || this;
        }
        return Warrior;
    }(Infantry));
    var Factory = (function () {
        function Factory() {
        }
        return Factory;
    }());
    var WarFactory = (function (_super) {
        __extends(WarFactory, _super);
        function WarFactory() {
            return _super.apply(this, arguments) || this;
        }
        WarFactory.prototype.ProduceDefaultUnit = function () {
            return this.ProduceTank();
        };
        Object.defineProperty(WarFactory.prototype, "CategoryName", {
            get: function () {
                return "重工";
            },
            enumerable: true,
            configurable: true
        });
        return WarFactory;
    }(Factory));
    var SovietWarFactory = (function (_super) {
        __extends(SovietWarFactory, _super);
        function SovietWarFactory() {
            return _super.apply(this, arguments) || this;
        }
        SovietWarFactory.prototype.ProduceTank = function () {
            return new HammerTank();
        };
        return SovietWarFactory;
    }(WarFactory));
    var JapanWarFactory = (function (_super) {
        __extends(JapanWarFactory, _super);
        function JapanWarFactory() {
            return _super.apply(this, arguments) || this;
        }
        JapanWarFactory.prototype.ProduceTank = function () {
            return new TsunamiTank();
        };
        return JapanWarFactory;
    }(WarFactory));
    var Barrack = (function (_super) {
        __extends(Barrack, _super);
        function Barrack() {
            return _super.apply(this, arguments) || this;
        }
        Barrack.prototype.ProduceDefaultUnit = function () {
            return this.ProduceInfantry();
        };
        Object.defineProperty(Barrack.prototype, "CategoryName", {
            get: function () {
                return "兵营";
            },
            enumerable: true,
            configurable: true
        });
        return Barrack;
    }(Factory));
    var SovietBarrack = (function (_super) {
        __extends(SovietBarrack, _super);
        function SovietBarrack() {
            return _super.apply(this, arguments) || this;
        }
        SovietBarrack.prototype.ProduceInfantry = function () {
            return new Conscript();
        };
        return SovietBarrack;
    }(Barrack));
    var JapanBarrack = (function (_super) {
        __extends(JapanBarrack, _super);
        function JapanBarrack() {
            return _super.apply(this, arguments) || this;
        }
        JapanBarrack.prototype.ProduceInfantry = function () {
            return new Warrior();
        };
        return JapanBarrack;
    }(Barrack));
    var Side = (function () {
        function Side(commanderName) {
            this.CommanderName = commanderName;
        }
        Side.prototype.onWin = function () {
            System.Console.WriteLine(this.CommanderName + "的" + this.Name + "获胜");
        };
        Side.prototype.canRush = function (other) {
            return this.CurrentFactory instanceof Barrack && other.CurrentFactory instanceof WarFactory;
        };
        Side.prototype.rush = function (other) {
            System.Console.WriteLine(this.CommanderName + "的" + this.Name + "选择冲" + other.CommanderName + "的基地");
            var success = Math.random() < 0.5;
            System.Console.WriteLine(success ? "效果拔群！" : "然而被压了回来。");
            return success;
        };
        Side.prototype.startBattle = function () {
            System.Console.WriteLine(this.CommanderName + this.CurrentFactory.CategoryName + "开局");
        };
        return Side;
    }());
    var Soviet = (function (_super) {
        __extends(Soviet, _super);
        function Soviet(commanderName) {
            var _this = _super.call(this, commanderName) || this;
            var rnd = Math.random();
            _this.CurrentFactory = rnd > 0.5 ? new SovietWarFactory() : new SovietBarrack();
            _this.CurrentUnit = _this.CurrentFactory.ProduceDefaultUnit();
            return _this;
        }
        Object.defineProperty(Soviet.prototype, "Name", {
            get: function () {
                return "苏联";
            },
            enumerable: true,
            configurable: true
        });
        return Soviet;
    }(Side));
    var Japan = (function (_super) {
        __extends(Japan, _super);
        function Japan(commanderName) {
            var _this = _super.call(this, commanderName) || this;
            var rnd = Math.random();
            _this.CurrentFactory = rnd > 0.5 ? new JapanWarFactory() : new JapanBarrack();
            _this.CurrentUnit = _this.CurrentFactory.ProduceDefaultUnit();
            return _this;
        }
        Object.defineProperty(Japan.prototype, "Name", {
            get: function () {
                return "日本";
            },
            enumerable: true,
            configurable: true
        });
        return Japan;
    }(Side));
    var SideSelector = (function () {
        function SideSelector() {
        }
        SideSelector.prototype.randomSide = function (commanderName) {
            var rnd = Math.random();
            var ret = rnd > 0.5 ? new Soviet(commanderName) : new Japan(commanderName);
            System.Console.WriteLine(ret.CommanderName + "选择了一个" + ret.Name);
            return ret;
        };
        return SideSelector;
    }());
    var Program = (function () {
        function Program() {
        }
        Program.Main = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length != 2) {
                System.Console.WriteLine("初始化错误: 玩家数量不是 2 个。");
            }
            var sideSel = new SideSelector();
            var side1;
            var side2;
            var btnStart = document.getElementById("btnStart");
            btnStart.disabled = true;
            var tsk = Task.Run(function () {
                side1 = sideSel.randomSide(args[0]);
                side2 = sideSel.randomSide(args[1]);
            }).Delay(500).Then(function () {
                side1.startBattle();
                side2.startBattle();
            }).Delay(300).Then(function () {
                var normalBattle = function () {
                    UnitOperations.Fight(side1.CurrentUnit, side2.CurrentUnit);
                    if (side1.CurrentUnit.IsAlive && !side2.CurrentUnit.IsAlive) {
                        side1.onWin();
                    }
                    else if (!side1.CurrentUnit.IsAlive && side2.CurrentUnit.IsAlive) {
                        side2.onWin();
                    }
                    else {
                        System.Console.WriteLine("平局。");
                    }
                };
                var battleEnd = function () {
                    System.Console.WriteLine("模拟结束。");
                    btnStart.disabled = false;
                };
                var finalTask = Task.Run(function () { });
                if (side1.canRush(side2)) {
                    if (side1.rush(side2)) {
                        side1.onWin();
                    }
                    else {
                        finalTask = finalTask.Delay(300).Then(normalBattle);
                    }
                }
                else if (side2.canRush(side1)) {
                    if (side2.rush(side1)) {
                        side2.onWin();
                    }
                    else {
                        finalTask = finalTask.Delay(300).Then(normalBattle);
                    }
                }
                else {
                    finalTask = finalTask.Then(normalBattle);
                }
                finalTask.Then(battleEnd);
            });
        };
        return Program;
    }());
    Simulations.Program = Program;
})(Simulations || (Simulations = {}));
//# sourceMappingURL=Simulations.js.map