namespace Simulations
{
    import Task = System.Threading.Tasks.Task;

    abstract class Unit
    {
        private _Strength: number;
        get Strength(): number
        {
            return this._Strength;
        }

        private _Health: number;
        get Health(): number
        {
            return this._Health;
        }
        set Health(val: number)
        {
            this._Health = val;
            if (val <= 0)
            {
                this.UnitLost();
            }
        }

        Name: string;

        get IsAlive()
        {
            return this.Health > 0;
        }

        constructor(strength: number, name: string)
        {
            this._Strength = strength;
            this.Health = strength;
            this.Name = name;
        }

        UnitLost()
        {
            System.Console.WriteLine("单位 " + this.Name + " 阵亡");
        }
    }
    class UnitOperations
    {
        static Fight(unit1: Unit, unit2: Unit)
        {
            let damage = Math.min(unit1.Strength, unit2.Strength);
            unit1.Health -= damage;
            unit2.Health -= damage;
        }
    }
    abstract class Tank extends Unit
    {

    }
    class HammerTank extends Tank
    {
        constructor()
        {
            super(1000, "铁锤坦克");
        }
    }
    class TsunamiTank extends Tank
    {
        constructor()
        {
            super(900, "海啸坦克");
        }
    }
    abstract class Infantry extends Unit
    {

    }
    class Conscript extends Infantry
    {
        constructor()
        {
            super(240, "动员兵");
        }
    }
    class Warrior extends Infantry
    {
        constructor()
        {
            super(300, "帝国武士");
        }
    }
    abstract class Factory 
    {
        abstract ProduceDefaultUnit(): Unit;
        abstract get CategoryName(): string;
    }
    abstract class WarFactory extends Factory
    {
        abstract ProduceTank(): Tank;
        ProduceDefaultUnit()
        {
            return this.ProduceTank();
        }
        get CategoryName(): string
        {
            return "重工";
        }
    }
    class SovietWarFactory extends WarFactory
    {
        ProduceTank(): Tank
        {
            return new HammerTank();
        }
    }
    class JapanWarFactory extends WarFactory
    {
        ProduceTank(): Tank
        {
            return new TsunamiTank();
        }
    }
    abstract class Barrack extends Factory
    {
        abstract ProduceInfantry(): Infantry;
        ProduceDefaultUnit()
        {
            return this.ProduceInfantry();
        }
        get CategoryName(): string
        {
            return "兵营";
        }
    }
    class SovietBarrack extends Barrack
    {
        ProduceInfantry(): Infantry
        {
            return new Conscript();
        }
    }
    class JapanBarrack extends Barrack
    {
        ProduceInfantry(): Infantry
        {
            return new Warrior();
        }
    }
    abstract class Side
    {
        abstract get Name(): string;
        CommanderName: string;
        CurrentFactory: Factory;
        CurrentUnit: Unit;
        onWin()
        {
            System.Console.WriteLine(this.CommanderName + "的" + this.Name + "获胜");
        }
        canRush(other: Side)
        {
            return this.CurrentFactory instanceof Barrack && other.CurrentFactory instanceof WarFactory;
        }
        rush(other: Side)
        {
            System.Console.WriteLine(this.CommanderName + "的" + this.Name + "选择冲" + other.CommanderName + "的基地");
            let success = Math.random() < 0.5;
            System.Console.WriteLine(success ? "效果拔群！" : "然而被压了回来。");
            return success;
        }
        startBattle()
        {
            System.Console.WriteLine(this.CommanderName + this.CurrentFactory.CategoryName + "开局");
        }
        constructor(commanderName: string)
        {
            this.CommanderName = commanderName;
        }
    }
    class Soviet extends Side
    {
        get Name(): string
        {
            return "苏联";
        }
        constructor(commanderName: string)
        {
            super(commanderName);
            let rnd = Math.random();
            this.CurrentFactory = rnd > 0.5 ? new SovietWarFactory() : new SovietBarrack();
            this.CurrentUnit = this.CurrentFactory.ProduceDefaultUnit();
        }
    }
    class Japan extends Side
    {
        get Name(): string
        {
            return "日本";
        }
        constructor(commanderName: string)
        {
            super(commanderName);
            let rnd = Math.random();
            this.CurrentFactory = rnd > 0.5 ? new JapanWarFactory() : new JapanBarrack();
            this.CurrentUnit = this.CurrentFactory.ProduceDefaultUnit();
        }
    }
    class SideSelector
    {
        randomSide(commanderName: string)
        {
            let rnd = Math.random();
            let ret = rnd > 0.5 ? new Soviet(commanderName) : new Japan(commanderName);
            System.Console.WriteLine(ret.CommanderName + "选择了一个" + ret.Name);
            return ret;
        }
    }
    export class Program
    {
        static Main(...args: string[])
        {
            if (args.length != 2)
            {
                System.Console.WriteLine("初始化错误: 玩家数量不是 2 个。");
            }
            let sideSel = new SideSelector();
            let side1: Side;
            let side2: Side;
            let btnStart = <HTMLInputElement>document.getElementById("btnStart");
            btnStart.disabled = true;
            let tsk = Task.Run(() =>
            {
                side1 = sideSel.randomSide(args[0]);
                side2 = sideSel.randomSide(args[1]);
            }).Delay(500).Then(() =>
            {
                side1.startBattle();
                side2.startBattle();
            }).Delay(300).Then(() =>
            {
                let normalBattle = () =>
                {
                    UnitOperations.Fight(side1.CurrentUnit, side2.CurrentUnit);
                    if (side1.CurrentUnit.IsAlive && !side2.CurrentUnit.IsAlive)
                    {
                        side1.onWin();
                    }
                    else if (!side1.CurrentUnit.IsAlive && side2.CurrentUnit.IsAlive)
                    {
                        side2.onWin();
                    }
                    else
                    {
                        System.Console.WriteLine("平局。");
                    }
                };
                let battleEnd = () =>
                {
                    System.Console.WriteLine("模拟结束。");
                    btnStart.disabled = false;
                };
                let finalTask = Task.Run(() => { });
                if (side1.canRush(side2))
                {
                    if (side1.rush(side2))
                    {
                        side1.onWin();
                    }
                    else
                    {
                        finalTask = finalTask.Delay(300).Then(normalBattle);
                    }
                }
                else if (side2.canRush(side1))
                {
                    if (side2.rush(side1))
                    {
                        side2.onWin();
                    }
                    else
                    {
                        finalTask = finalTask.Delay(300).Then(normalBattle);
                    }
                }
                else
                {
                    finalTask = finalTask.Then(normalBattle);
                }
                finalTask.Then(battleEnd);
            });
        }
    }
}