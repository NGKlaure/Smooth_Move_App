
print("id,currenttest,trialNumber,x,y,z");
db.accData2.find().forEach(function(user){
  print(user._id.valueOf()+","+user.currenttest+","+ user.trialNumber+","+user.x+","+user.y+","+user.z);
});


//lunch or connect to mongodb using the command "mongod"
// cd into the folder were the script is store and run the following command

//mongo data mongoScript.js > out.csv
//here data is the name of the database