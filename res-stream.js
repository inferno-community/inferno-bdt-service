

module.exports = function RESStreamReporter(res)
{

    return (res) => 
    {
        function logEvent(data) {
            try {
                console.log(JSON.stringify(data));
            } catch (ex) {
                console.error("logEvent: ", ex);
            }
            return data
        }
        
        function onStart() {
            logEvent({ type: "start" });
        }
        
        function onEnd() {
            logEvent({ type: "end" });
        }
        
        function onGroupStart(data) {
            logEvent({ type: "groupStart", data });
        }
        
        function onGroupEnd(data) {
            logEvent({ type: "groupEnd", data });
        }
        
        function onTestStart(data) {
            logEvent({ type: "testStart", data });
        }
        
        function onTestEnd(data) {
            res.write(JSON.stringify(data));
            logEvent({ type: "testEnd", data });
        }

        return {
            attach(runner)
            {
                runner.on("start"     , onStart     );
                runner.on("groupStart", onGroupStart);
                runner.on("end"       , onEnd       );
                runner.on("groupEnd"  , onGroupEnd  );
                runner.on("testStart" , onTestStart );
                runner.on("testEnd"   , onTestEnd   );
            },

            detach(runner)
            {
                runner.off("start"     , onStart     );
                runner.off("groupStart", onGroupStart);
                runner.off("end"       , onEnd       );
                runner.off("groupEnd"  , onGroupEnd  );
                runner.off("testStart" , onTestStart );
                runner.off("testEnd"   , onTestEnd   );
            }
        }
    };
}
