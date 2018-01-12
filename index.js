
var SERVER_NAME = 'HealthCare-api'
var PORT = process.env.PORT;
//var HOST = "127.0.0.1";
//var PORT = 3000;



var restify = require('restify')

  // Get a persistence engine for the patients
  , UsersSave = require('save')('Users')
  , NewsSave = require('news')('news')
  , PatientsSave = require('save')('Patients')
  , Patient_recordsSave = require('save')('Patient_records')
  
  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log("End Points :");
 
  console.log('Resources:')
  console.log(' /patients')
  console.log(' /patients/:id')  
  console.log(' /patients/:id/records')  
  
})

server
// Allow the use of POST
.use(restify.fullResponse())

// Maps req.body to req.params so there is no switching between them
.use(restify.bodyParser())



//------------------------------------------------------------------------------//
                       // Create a NEWS
//------------------------------------------------------------------------------//
server.post('/news', function (req, res, next) {
  
  // Make sure first_name and last_name is defined
  if (req.params.title === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('title must be supplied'))
}
 if (req.params.detail === undefined) {
  // If there are any errors, pass them to next in the correct format
  return next(new restify.InvalidArgumentError('detail must be supplied'))
}


// Creating new patient.
 var newnews = {
    title: req.params.title,
    detail: req.params.detail,
    
  }

// Create the patient using the persistence engine
    NewsSave.create( newnews, function (error, news) {

  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

  // Send the patient if no issues
  res.send(201, news)
})
})

//------------------------------------------------------------------------------//
                  // Get all News
//------------------------------------------------------------------------------//



server.get('/news', function (req, res, next) {
     
  // Find every entity within the given collection
  NewsSave.find({}, function (error, news) {
  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

   res.send(news);
 })
})

//------------------------------------------------------------------------------//
                       // Create a new User 
//------------------------------------------------------------------------------//
server.post('/users', function (req, res, next) {
  
  // Make sure first_name and last_name is defined
  if (req.params.first_name === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('first_name must be supplied'))
}
 if (req.params.last_name === undefined) {
  // If there are any errors, pass them to next in the correct format
  return next(new restify.InvalidArgumentError('last_name must be supplied'))
}


// Creating new patient.
 var newuser = {
    first_name: req.params.first_name,
    last_name: req.params.last_name,
    display_name: req.params.display_name,
    email: req.params.email,
    password: req.params.password
  }

// Create the patient using the persistence engine
UsersSave.create( newuser, function (error, user) {

  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

  // Send the patient if no issues
  res.send(201, user)
})
})

//------------------------------------------------------------------------------//
                  // Get all users
//------------------------------------------------------------------------------//



server.get('/users', function (req, res, next) {
     
  // Find every entity within the given collection
  UsersSave.find({}, function (error, users) {
  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

   res.send(users);
 })
})



//------------------------------------------------------------------------------//
                  // Get a single user by their user id
//------------------------------------------------------------------------------//

  server.get('/users/:id', function (req, res, next) {

    // Find a single patient by their id within save
    UsersSave.findOne({ _id: req.params.id }, function (error, users) {

      
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (users) {
      // Send the patient if no issues
      res.send(users)
    } else {
      // Send 404 header if the patient doesn't exist
      res.send(404)
    }
  })
})





//------------------------------------------------------------------------------//
                       // Create a new Patient 
//------------------------------------------------------------------------------//
server.post('/patients', function (req, res, next) {
  
      // Make sure first_name and last_name is defined
      if (req.params.first_name === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('first_name must be supplied'))
    }
     if (req.params.last_name === undefined) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('last_name must be supplied'))
    }
    

    // Creating new patient.
     var newPatient = {
        first_name: req.params.first_name,
        last_name: req.params.last_name,
        address: req.params.address,
        city: req.params.city,
        state:req.params.state,
        zip_code: req.params.zip_code,
        date_of_birth: req.params.date_of_birth,
        email: req.params.email,
        home_phone: req.params.home_Phone,
        cell_phone: req.params.cell_phone,
        department: req.params.department,
        doctor: req.params.doctor
      }
  
    // Create the patient using the persistence engine
    PatientsSave.create( newPatient, function (error, Patient) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send the patient if no issues
      res.send(201, Patient)
    })
  })

//------------------------------------------------------------------------------//
                       // Create a new Patient records
//------------------------------------------------------------------------------//
server.post('/patients/:id/records', function (req, res, next) {
    
        // Make sure first_name and last_name is defined
        if (req.params.patient_id === undefined) {
          // If there are any errors, pass them to next in the correct format
          return next(new restify.InvalidArgumentError('Patient id must be supplied'))
      }
      
      
        // Creating new patient.
        var newPatient_Records = {
            patient_id: req.params.patient_id, 
            date: req.params.date, 
            nurse_name: req.params.nurse_name,
            category: req.params.category,
            reading1:req.params.reading1,
            reading2:req.params.reading2,
            food_allergy: req.params.food_allergy,
            bp: req.params.bp,
            diabetic: req.params.diabetic,
            heart_disease: req.params.heart_disease,
            surgery: req.params.surgery,
            accident: req.params.accident
           
          }
    
      // Create the patient using the persistence engine
      Patient_recordsSave.create( newPatient_Records, function (error, Patient_records) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send the patient if no issues
        res.send(201, Patient_records)
      })
    })


//------------------------------------------------------------------------------//
                      // Get all Patients in the system
//------------------------------------------------------------------------------//

        server.get('/patients', function (req, res, next) {
     
        // Find every entity within the given collection
        PatientsSave.find({}, function (error, Patients) {
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
         res.send(Patients);
       })
    })

//------------------------------------------------------------------------------//
                      // Get all Patient records in the system
//------------------------------------------------------------------------------//

server.get('/patients/:id/records', function (req, res, next) {
        
        // Find every entity within the given collection
        Patient_recordsSave.find({patient_id: req.params.id}, function (error, Patient_records) {
  
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        
        res.send(Patient_records);
        })
})

//------------------------------------------------------------------------------//
                      // Get  Patient records by id in the system
//------------------------------------------------------------------------------//

server.get('/patients/:pid/records/:id', function (req, res, next) {
        
  // Find every entity within the given collection
  Patient_recordsSave.find({patient_id: req.params.pid, _id:req.params.id}, function (error, Patient_records) {

  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
  res.send(Patient_records);
  })
})

//------------------------------------------------------------------------------//
                      // Get a single patient by their Patient id
//------------------------------------------------------------------------------//

      server.get('/patients/:id', function (req, res, next) {

        // Find a single patient by their id within save
        PatientsSave.findOne({ _id: req.params.id }, function (error, Patients) {
    
          
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if (Patients) {
          // Send the patient if no issues
          res.send(Patients)
        } else {
          // Send 404 header if the patient doesn't exist
          res.send(404)
        }
      })
    })




//------------------------------------------------------------------------------//
                      // Update a Patient record by their id
//------------------------------------------------------------------------------//

      server.put('/patients/:patient_id/records/:id', function (req, res, next) {
       
        // Creating new patient.
        var newPatient_Records = {
            _id:req.params.id,
            patient_id: req.params.patient_id, 
            date: req.params.date, 
            nurse_name: req.params.nurse_name,
            category: req.params.category,
            reading1:req.params.reading1,
            reading2:req.params.reading2,
            food_allergy: req.params.food_allergy,
            bp: req.params.bp,
            diabetic: req.params.diabetic,
            heart_disease: req.params.heart_disease,
            surgery: req.params.surgery,
            accident: req.params.accident
          }


          // Update the patient with the persistence engine
          Patient_recordsSave.update(newPatient_Records, function (error, patient_record) {
      
          // If there are any errors, pass them to next in the correct format
          if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
      
          // Send a 200 OK response
          res.send(200)
          
        })
      })
      
//------------------------------------------------------------------------------//
                      // Update a Patient by their id
//------------------------------------------------------------------------------//

server.put('/patients/:id', function (req, res, next) {
  
   
   // Creating new patient.
    var newPatient = {
       _id:req.params.id,
       first_name: req.params.first_name,
       last_name: req.params.last_name,
       address: req.params.address,
       city: req.params.city,
       state:req.params.state,
       zip_code: req.params.zip_code,
       date_of_birth: req.params.date_of_birth,
       email: req.params.email,
       home_phone: req.params.home_Phone,
       cell_phone: req.params.cell_phone,
       department: req.params.department,
       doctor: req.params.doctor }
   
     // Update the patient with the persistence engine
     PatientsSave.update(newPatient, function (error, Patient) {
 
     // If there are any errors, pass them to next in the correct format
     if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
     // Send a 200 OK response
     res.send(200)
     
   })
 })

 //------------------------------------------------------------------------------//
                       // Delete news  with the given id
//------------------------------------------------------------------------------//

server.del('/news/:id', function (req, res, next) {
  
  // Delete the patient with the persistence engine
  NewsSave.delete(req.params.id, function (error, news) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

//------------------------------------------------------------------------------//
                       // Delete Patient  with the given id
//------------------------------------------------------------------------------//

server.del('/patients/:id', function (req, res, next) {
  
    // Delete the patient with the persistence engine
    PatientsSave.delete(req.params.id, function (error, Patient) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send a 200 OK response
      res.send(200)
    })
  })
  
//------------------------------------------------------------------------------//
                      // Delete all Patients in the system
//------------------------------------------------------------------------------//

server.del('/patients', function (req, res, next) {
  
     
       // PatientsSave = require('save')('')
        PatientsSave.deleteMany({},function(error, patients){
            if(error)
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

            res.send("All Records Delete");
        });
  
 })

 //------------------------------------------------------------------------------//
                      // Delete all Patient records in the system
//------------------------------------------------------------------------------//

server.del('/patients/:patient_id/records/:id', function (req, res, next) {
  
  
      // Delete the patient with the persistence engine
      Patient_recordsSave.delete(req.params.id, function (error, patient_record) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send a 200 OK response
      res.send(200)
    
            res.send("All Records Delete");
        });
  
 })