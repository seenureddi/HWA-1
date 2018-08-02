This is homework assignment #1.  It creates a RESTful JASON API which provides a JASON object when posted to the route /hello.

The instructor provided a skeleton in his lectures (which is by the way are excellent) and the source code is based on
some of the programs he provided.  He introduced the concept of req.on('data', ..) and when I discovered that since no 
data is received, I tried to make the program simpler by eliminating req.on('data', ..) and keeping req.on('end', ..) which
sends the results back to the client.  However I find that req.on('end', ..) is never called (maybe a quirk or intended) and 
I have to put req.on('data', ..) back in the program.  To exercise this functionality where data stream is not empty, I have 
to use a curl statement that provides POST data like:

curl --header "Content-Type: application/json" --request POST --data {\"username\":\"xyz\",\"password\":\"xyz\"} http://localhost:3000/hello?name=john

This statement provides both POST data and GET query.  The program combines headers, queries and data into a single JASON entity and adds
a joke (something the instructor provided) when /hello (case insensitive) is the parsed URL.  If /hello is not the parsed URL, it will give a
intrusion message.  The program tries to analyze the structures encountered in createServer and logs to the console.

The response to the above curl command is:

{"host":"localhost:3000","user-agent":"curl/7.59.0","accept":"*/*","content-type":"application/json","content-length":"35","name":"john","username":"xyz",
"password":"xyz","api":"hello","mesg":"Where do fish keep all their money? The river bank."}

If route url is not /hello as in the following case, we get a different response.

curl --header "Content-Type: application/json" --request POST --data {\"username\":\"xyz\",\"password\":\"xyz\"} http://localhost:3000/hellox?name=john

{"host":"localhost:3000","user-agent":"curl/7.59.0","accept":"*/*","content-type":"application/json","content-length":"35","name":"john","username":"xyz",
"password":"xyz","api":"hellox","mesg":"Who are you ?  What are you doing here ?"}

curl behaves differently for PC and linux (Fedora).  The above statements works for PC but for Fedora -- data .. has to be modifed as follows:

--data '{"username":"xyz","password":"xyz"}}'


