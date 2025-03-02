export default async function handler(req, res) {
    try {
      console.log('Received request body:', req.body);
  
      const { model, messages, temperature, course_name, stream, api_key, retrieval_only } = req.body;
  
      if (!course_name || !api_key) {
        return res.status(400).json({ error: 'Missing required field: course_name or api_key' });
      }
  
      const url = "https://uiuc.chat/api/chat-api/chat";
  
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`,
      };
  
      const data = {
        model,
        messages,
        temperature,
        course_name,
        stream,
        api_key,
        retrieval_only,
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const contentType = response.headers.get("content-type");
      const rawBody = await response.text();
  
      console.log('UIUC API Raw Response:', rawBody);
  
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = JSON.parse(rawBody);
      } else {
        result = {
          Event: rawBody,
          Choices: ["Investigate the clock tower", "Talk to the village elder", "Search for clues in the library"],
          HP: 0, DEF: 0, ATK: 0
        };
      }
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error in backend:', error.message || error);
      return res.status(500).json({ error: 'Failed to process the request' });
    }
  }
  