// System.Threading.Tasks.dll
// 版本 4.6.1
namespace System.Threading.Tasks
{
    /**
     * 不带并发和取消功能的任务。相当于 .NET Framework 2.0 异步运行机制。
     * 当 typescript 2.1 发布之后，此类将被归类为过时。
     */
    export class Task<T>
    {
        private _methodPtr: () => T;
        private _next: Task<T>;
        private _delay: number;
        private _result: T;
        private _finishCallback: (result: T) => void;
        /**
         * 启动一个带有返回值的任务
         @param body 任务的第一个操作
         */
        public static Run<T>(body: () => T): Task<T>
        {
            let tsk = new Task<T>();
            tsk._methodPtr = body;
            tsk.BeginInvoke();
            return tsk;
        }
        /**
         * 指定任务启动时操作
         */
        private BeginInvoke()
        {
            let curDelay = 0;
            if (this._methodPtr == null)
                setTimeout(() =>
                {
                    if (this._next != null)
                    {
                        this._next.BeginInvoke();
                    }
                    else if (this._finishCallback != null)
                    {
                        this._finishCallback(this._result);
                    }
                }, this._delay)
            else
                setTimeout(() =>
                {
                    this._result = this._methodPtr();
                    if (this._next != null)
                    {
                        this._next.BeginInvoke();
                    }
                    else if (this._finishCallback != null)
                    {
                        this._finishCallback(this._result);
                    }
                }, 0)
        }
        /**
         * 指定任务的后续操作
         @param body 任务后续操作
         */
        Then(body: () => T): Task<T>
        {
            let tsk = new Task<T>();
            tsk._methodPtr = body;
            tsk._finishCallback = this._finishCallback;
            this._next = tsk;
            return tsk;
        }
        /**
         * 让任务暂停执行指定的毫秒数而不阻塞UI操作
         @param body 暂停执行指定的毫秒数
         */
        Delay(delayMillsec: number): Task<T>
        {
            let tsk = new Task<T>();
            tsk._delay = delayMillsec;
            tsk._finishCallback = this._finishCallback;
            this._next = tsk;
            return tsk;
        }
        /**
         * 指定任务完成后的行为
         @param finishCallback 任务完成后的行为
         */
        EndInvoke(finishCallback: (result: T) => void)
        {
            this._finishCallback = finishCallback;
        }
    }
}