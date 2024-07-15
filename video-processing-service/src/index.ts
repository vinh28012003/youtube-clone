import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
app.post('/process-video', (req, res) => {

    //Input File paths
    const inputFilePath = req.body.inputFilePath; 
    const outputFilePath = req.body.outputFilePath;

    if(!inputFilePath){
      res.status(400).send("Bad request: Missing input file path.");
    }
    if (!outputFilePath){
      res.status(400).send("Bad request: Missing output file path.");
    }

    ffmpeg(inputFilePath)
      .outputOptions('vf', 'scaler=-1:360')
      .on('end', function(){
        res.status(200).send('Processing finished successfully.');
      })
      .on('error', function(err:any){
        res.status(600).send('An error occurred while processing'+err.message);
      })
      .save(outputFilePath);

});


const port = process.env.PORT||3000; //default port 3000 or port used by env at runtime

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});