import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Input } from '@mui/material';
import { Editor } from '@monaco-editor/react';

const App = () => {
  const [code, setCode] = useState('#The argument locations is a variable representing Santa\'s list\ndef find_highest_location(locations):\n');
  const [output, setOutput] = useState('');



  const executeCode = async () => {
    try {
      if (code.includes("print")){
        setOutput("You are not allowed to print anything")
        return;
      }
      const response = await axios.post('/api/execute', { code }); // Updated endpoint
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };


  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" style={{marginTop : 8, marginBottom : 16}}>Merry Christmas!</Typography>
      <Typography variant="h7" align="center" style={{marginBottom : 16}}>Santa forgot where he placed your gift. All he has is a list of the locations he was considering, along with a numerical value representing how good he thought each place would be. 
        We found Santa's list. It is a list of tuples of the form (value : number, location : string). An example to demonstrate this format is [(1, "chimney"), (-1, "under the grill"), (3, "dining room table"), (2, "basement refrigerator")]
        The actual list is different. In order to unlock the location of your gift, you must find the location with the highest value. Fill in the following Python method to return the location with the highest value. Using the example above, 
        your method would return "dining room table". When ready, submit your code. If correct, the location will be revealed. 
      </Typography>
      <Container style={{marginTop : 8, marginBottom : 8}}>
        <Editor
          height="300px"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(newCode) => setCode(newCode)}
        />
      </Container>

      <br />
      <Button variant="contained" onClick={executeCode}>Submit</Button>
      <Container style={{marginTop : 8, marginBottom : 8}}>
        <Typography variant="h4" align="center">Output</Typography>
        <Typography variant="p" align="center">{output}</Typography>
      </Container>
    </Container>
  );
};

export default App;
