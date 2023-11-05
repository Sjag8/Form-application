const express = require("express");
const ejs = require("ejs");
const path = require("path");
const model = require("./model/Workshop.js");
const model2 = require("./model/Workshop_Details.js");
const WorkShopsDetails = model2.WorkShopsDetails;
const model1 = require("./model/Job_Slip_Form.js");
const Jobslip = model1.Jobslip;
const WorkshopUser = model.WorkShopUser;
const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1/test";
const bodyParser = require("body-parser");
const sendMail = require("./Nodemailer");
app = express();
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB database:", err);
  });





const userForm = (req, res, next) => {
  ejs.renderFile(
    path.resolve(__dirname, "./pages/pages.ejs"),
    {},
    function (err, str) {
      res.send(str);
    }
  );
};

app.get("/" ,  userForm);
const createWorkshopUser = (req, res) => {
    const UserObject = {
      Name: req.body.username,
      Birla_Copper_Employee_Id: req.body.employeeId,
      Email_ID: req.body.email,
      Mobile_No: req.body.UsermobileNumber,
    };
    const user = new WorkshopUser(UserObject);
    user.save().then((st) => {

        //  sendMail({username:req.body.username,email:req.body.email});

        ejs.renderFile( 
          path.resolve(__dirname,"./pages/workshopInventoryMan.ejs"),
          {},
          function (err, str) {
            res.send(str);
          }
        );
      }).catch((err) => {res.send(err);});
};


app.post("/workshop", createWorkshopUser);
const JobSlipcontroller = (req, res) => {
  const JobsSlipObject = {
    Department: req.body.jobRequisitionNo,
    Job_Origination_Date: req.body.jobOriginationDate,
    Job_Required_Date: req.body.jobRequiredDate,
    Material: req.body.material,
    Quantity: req.body.quantity,
    Job_Description: req.body.jobDescription,
    Add_Job_Drawing_Picture: req.file.path,
  };


  const jobslip = new Jobslip(JobsSlipObject);
  jobslip
    .save()
    .then((st) => {
      console.log(req.file);
      ejs.renderFile(
        path.resolve(__dirname, "./pages/workshopInventoryMan.ejs"),
        {},
        function (err, str) {
          res.send(str);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

app.get("/jobslip", (req, res) => {
  ejs.renderFile(
    path.resolve(__dirname, "./pages/Job_Slip.ejs"),
    {},
    function (err, str) {
      res.send(str);
    }
  );
});

const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// app.use(multer({storage:fileStorage, fileFilter:fileFilter}).single('jobDrawing'));
app.use(multer({ storage: fileStorage }).single("jobDrawing"));

app.post("/jobslip", JobSlipcontroller);

app.use(express.static(path.join(__dirname, "static")));
app.get("/workshopdetails", (req, res) => {
  ejs.renderFile(
    path.resolve(__dirname, "./pages/Workshop_Details_Form.ejs"),
    {},
    function (err, str) {
      res.send(str);
    }
  );
});

const WorkShopsDetailsController = (req, res, next) => {
  const DetailsObject = {
    Actual_Date_of_Completion: req.body.actualDateOfCompletion,
    Job_No: req.body.jobNumber,
    Quantity: req.body.quantityWorkshop,
    Name_of_Workshop_Incharge: req.body.workshopIncharge,
    Job_Organizer: req.body.jobOrganizer,
    Material_Used: req.body.materialUsed,
    Job_Comleted_Date: req.body.jobCompletedDate,
  };

  const workshopsdetails = new WorkShopsDetails(DetailsObject);
  workshopsdetails
    .save()
    .then((st) => {
      console.log(req.file);
      ejs.renderFile(
        path.resolve(__dirname, "./pages/loginSuccess.ejs"),
        {},
        function (err, str) {
          res.send(str);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

app.post("/workshopdetails", WorkShopsDetailsController);



app.get('/backtoform', (req,res)=>{
 ejs.renderFile(
        path.resolve(__dirname, "./pages/workshopInventoryMan.ejs"),
        {},
        function (err, str) {
          res.send(str);
        }
      );
       } )

var port = 8000;
app.listen(port, () => {
  console.log("Server started at port ", port);
});
