const express = require("express");

const bodyParser = require("body-parser");
// const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/ClothDB" , {useNewUrlParser:true});

const clothesSchema = {
    title : String,
    description : String
};

const Clothe = mongoose.model("clothe" ,clothesSchema ); 

// app.route("/info").get().post().delete();//understanding purpose.


 

app.route("/info").get(function(req, res){
    Clothe.find(function(err, results){
        if(!err){
            res.send(results);

        }
        else{
            res.send(err);
        }
    });
})
.post(function(req, res){
    const newClothe = new Clothe({
        title : req.body.title,
        description : req.body.description
    });
    newClothe.save(function(err){
        if(!err){
            res.send("successfully added new data");
        }
        else{
            res.send(err);
        }
    });
})
.delete(function(req,res){
    Clothe.deleteMany(function(err){
        if(!err){
            res.send("data deleted successfully");
        }
        else{
            res.send(err);
        }
    });
});


app.route("/info/:datainput")
.get(function(req,res){

    Clothe.findOne({title: req.params.datainput}, function(err, result){
        if(result){
            res.send(result);
        
        }
        else{ 
            res.send("no data found");
        }
    } );
})
.put(function(req, res){

    Clothe.update(
        {title : req.params.datainput},
        {title : req.body.title, description : req.body.description},
        {overwrite : true},

        function(err){

            if(!err){
                res.send("updated successfully uding put");
            }
        }

    );
})

.patch(function(req, res){


    /*req.body = {
        title : "textss",
        description : "something"
    }*/

    Clothe.update(
        {title : req.params.datainput},
        {$set : req.body },
        function(err){
            if(!err){
                res.send("patch operation updated successfully");
            }
            else{
                res.send(err);
            }
        }
        );
})

.delete(function(req, res){
   Clothe.deleteOne(
        {title : req.params.datainput},
        function(err){
            if(!err){
                res.send("deleted particular one successfully");
            }
        }
        
           );
});

// app.get("/info",function(req, res){
//     Motorcycle.find(function(err, results){
//         if(!err){
//             res.send(results);
//     // console.log(results);
//         }
//         else{
//             res.send(err);
//         }
//     });
//     });

//     app.post("/info",function(req, res){
//         const newMotorcycle = new Motorcycle({
//             title : req.body.title,
//             description : req.body.description
//         });
       
//         newMotorcycle.save(function(err){
//             if(!err){
//                 res.send("successfully added new data");
//             }
//             else{
//                 res.send(err); 
//             }
//         });
//     });

//     app.delete("/info",function(req, res){
//         Motorcycle.deleteMany(function(err){
//             if(!err){
//                 res.send("successfully deleted");
//             }
//             else{
//                 res.send(err);
//             }
//         })
//     })





    app.listen(3000, function(req, res){

        console.log("port running on 3000");
    
    })


