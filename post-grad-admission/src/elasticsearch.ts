import { Client } from '@elastic/elasticsearch';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as fs from 'fs'
const client = new Client({
  node: 'https://192.168.0.129:9200',
  auth: {
    username: '', // Replace with your actual username
    password: ''  // Replace with your actual password
  }, 
  tls: {
    ca: [fs.readFileSync(path.join('ca_1722947738047.crt'))], // Path to your CA certificate
    rejectUnauthorized: true, // Ensure that Elasticsearch's certificate is verified
}
});
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/documents', async (req, res) => {
  const documents = req.body;
  const body = documents.flatMap((doc: any) => [{ index: { _index: 'my-index', _id: doc.id } }, doc]);

  try {
    const bulkResponse = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      const erroredDocuments: any[] = [];
      bulkResponse.items.forEach((action: any, i: number) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      console.error('Errors:', erroredDocuments);
      res.status(500).json({ errors: erroredDocuments });
    } else {
      res.status(200).json({ message: 'All documents indexed successfully.' });
    }
  } catch (error) {
    console.error('Error indexing data:', error);
    res.status(500).json({ error: 'Error indexing data' });
  }
});


app.get('/documents', async (req, res) => {
  try {
    const result = await client.search({
      index: 'my-index',
      query: {
        match_all: {}
      }
    });
    res.status(200).json(result.hits.hits);
  } catch (error) {
    console.error('Error retrieving all data:', error);
    res.status(500).json({ error: 'Error retrieving all data' });
  }
});

app.put('/documents/:id', async (req, res) => {
  const { id } = req.params;
  const document = req.body;

  try {
    const response = await client.index({
      index: 'my-index',
      id: id,
      document: document,
      refresh: true
    });

    res.status(200).json({ message: 'Document updated successfully.', result: response });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Error updating document' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});