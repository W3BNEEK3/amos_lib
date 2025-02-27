app.use(express.urlencoded ({extended: true}));

app.get('/status', (req, res) => {

res.send({message: 'up and running'});

});

app.post("/find_max", (req, res)=>{
   console.log(req.body);
   const {num1, num2} = req.body;
   const max = numi > num2? num1: num2;
   res.send({max});
});
app.listen(3000, () => {

console.log("Server is running")

});