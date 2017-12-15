var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'ZDywqSKuopSF65OIVrgyftFqmTVVtZ9L9mw4C/Dv',
    accessKeyId: 'AKIAIA26DK7VMKAOTT4Q',
    region: 'us-west-1'
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'travelbookpictures',
        key: function (req, file, cb) {
            // console.log(file.originalname);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

var db = require("../models");

module.exports = function(app) {

  app.post("/signup", function(req, res) {

    db.user.create({

      username: req.body.users,
      password: req.body.pws

    }).then(function(results) {

      console.log("user added");
      console.log(results);

      res.end();
    });
  });

  app.get("/login", function(req, res) {

    db.user.findAll({}).then(function(results) {

      console.log("found user data");
      console.log(results);

      res.json(results);
    });

  });

  app.get("/search/:country/:city/:categories", function(req, res) {

    db.post.findAll({

      where: {
        country: req.params.country,
        city: req.params.city,
        categories: req.params.categories,
      },
      include: [db.user]

    }).then(function(results) {

      // console.log("found posts");
       console.log(results);

      var data = {
        daty: results,
        city: req.params.city,
        country:req.params.country
      }

      console.log(data.daty);

      res.render("result", {data});
    });

  });

  app.post("/add", upload.array('upl', 1), function(req, res) {
    console.log(req.files[0].originalname);
    console.log(req.body);
    // res.send('worked');
    console.log(req.body.user);

    db.user.findOne({

      where:{
        username: req.body.user
      }
    }).then(function(results) {


      console.log(results);
      console.log(results.id);

    db.post.create({
      image: req.files[0].originalname,
      country: req.body.country,
      city: req.body.city,
      review: req.body.review,
      name: req.body.name,
      categories: req.body.category,
      price: parseInt(req.body.pricepoint),
      rating: parseInt(req.body.rating),
      userId: results.id

    }).then(function(results) {

      console.log("added post");
      console.log(results.dataValues);

      res.redirect("/");
    });

  });

  });


  app.put("/loggedin", function(req, res) {

    db.user.update({

      loggedIn: true
    }, {

      where: {

        id: req.body.info
      }

    }).then(function(results) {

      res.end();

    });

  });


app.get("/user", function(req, res) {

    db.user.findAll({
    }).then(function(results) {

      console.log(results);

      var data = {

        daty: results

      }

      console.log(data);

      res.render("userSearch", {data})

});
  });



};