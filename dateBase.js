import mongoose from 'mongoose';




const mongoDbUri = "mongodb+srv://mohsin-admin:mohsin123@cluster0.zdmna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(mongoDbUri, {
        dbName: "my-todo-db",
      });
  
      console.log(`\n🌿 MongoDB connected ! 🍃\n`);
  
      mongoose.connection.on(
        "error",
        console.error.bind(console, "Connection error:"),
      );
  
      process.on("SIGINT", () => {
        // Cleanup code
        mongoose.connection.close();
  
        console.log("Mongoose connection closed due to application termination");
        process.exit(0);
      });
    } catch (error) {
      console.error("MONGODB connection FAILED ", error);
      process.exit(1); // Exited with error
    }
  };

 connectDB();















 