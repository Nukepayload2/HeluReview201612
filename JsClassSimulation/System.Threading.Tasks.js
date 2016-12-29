// System.Threading.Tasks.dll
// 版本 4.6.1
var System;
(function (System) {
    var Threading;
    (function (Threading) {
        var Tasks;
        (function (Tasks) {
            /**
             * 不带并发和取消功能的任务。相当于 .NET Framework 2.0 异步运行机制。
             * 当 typescript 2.1 发布之后，此类将被归类为过时。
             */
            var Task = (function () {
                function Task() {
                }
                /**
                 * 启动一个带有返回值的任务
                 @param body 任务的第一个操作
                 */
                Task.Run = function (body) {
                    var tsk = new Task();
                    tsk._methodPtr = body;
                    tsk.BeginInvoke();
                    return tsk;
                };
                /**
                 * 指定任务启动时操作
                 */
                Task.prototype.BeginInvoke = function () {
                    var _this = this;
                    var curDelay = 0;
                    if (this._methodPtr == null)
                        setTimeout(function () {
                            if (_this._next != null) {
                                _this._next.BeginInvoke();
                            }
                            else if (_this._finishCallback != null) {
                                _this._finishCallback(_this._result);
                            }
                        }, this._delay);
                    else
                        setTimeout(function () {
                            _this._result = _this._methodPtr();
                            if (_this._next != null) {
                                _this._next.BeginInvoke();
                            }
                            else if (_this._finishCallback != null) {
                                _this._finishCallback(_this._result);
                            }
                        }, 0);
                };
                /**
                 * 指定任务的后续操作
                 @param body 任务后续操作
                 */
                Task.prototype.Then = function (body) {
                    var tsk = new Task();
                    tsk._methodPtr = body;
                    tsk._finishCallback = this._finishCallback;
                    this._next = tsk;
                    return tsk;
                };
                /**
                 * 让任务暂停执行指定的毫秒数而不阻塞UI操作
                 @param body 暂停执行指定的毫秒数
                 */
                Task.prototype.Delay = function (delayMillsec) {
                    var tsk = new Task();
                    tsk._delay = delayMillsec;
                    tsk._finishCallback = this._finishCallback;
                    this._next = tsk;
                    return tsk;
                };
                /**
                 * 指定任务完成后的行为
                 @param finishCallback 任务完成后的行为
                 */
                Task.prototype.EndInvoke = function (finishCallback) {
                    this._finishCallback = finishCallback;
                };
                return Task;
            }());
            Tasks.Task = Task;
        })(Tasks = Threading.Tasks || (Threading.Tasks = {}));
    })(Threading = System.Threading || (System.Threading = {}));
})(System || (System = {}));
//# sourceMappingURL=System.Threading.Tasks.js.map