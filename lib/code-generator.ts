// Library function enhanced for CodeBoiler functionality - Sept 2024
import type { APITemplate, Language, Framework } from '@/types/api'

export function generateCode(api: APITemplate, language: Language, framework: Framework): string {
  // Get the template for the specific language and framework
  const template = api.codeTemplates?.[language]?.[framework]
  
  if (template) {
    return template
  }

  // Fallback to vanilla if framework not found
  const vanillaTemplate = api.codeTemplates?.[language]?.['vanilla']
  if (vanillaTemplate) {
    return vanillaTemplate
  }

  // Generate a basic template if none exists
  return generateFallbackCode(api, language, framework)
}

function generateFallbackCode(api: APITemplate, language: Language, framework: Framework): string {
  if (!api) {
    return `// API template not found`
  }
  
  const templates = {
    javascript: {
      vanilla: `// ${api.name} Integration
// ${api.description}

const apiKey = 'YOUR_API_KEY';
const baseURL = 'https://api.${api.name.toLowerCase()}.com';

// Initialize ${api.name} client
class ${api.name}Client {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('${api.name} API Error:', error);
      throw error;
    }
  }

  // Example method - customize based on API
  async getData() {
    return this.makeRequest('/data');
  }
}

// Usage example
const client = new ${api.name}Client(apiKey);

// Example usage
client.getData()
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
      react: `// ${api.name} React Hook
import React, { useState, useEffect } from 'react';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.${api.name.toLowerCase()}.com';

// Custom hook for ${api.name}
export const use${api.name} = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
        headers: {
          'Authorization': \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getData = () => makeRequest('/data');

  return { data, loading, error, getData, makeRequest };
};

// Example component
export const ${api.name}Component = () => {
  const { data, loading, error, getData } = use${api.name}();

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>${api.name} Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};`
    },
    typescript: {
      vanilla: `// ${api.name} Integration
// ${api.description}

interface ${api.name}Config {
  apiKey: string;
  baseURL?: string;
}

interface ${api.name}Response<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ${api.name}Client {
  private apiKey: string;
  private baseURL: string;

  constructor(config: ${api.name}Config) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || 'https://api.${api.name.toLowerCase()}.com';
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<${api.name}Response<T>> {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config: RequestInit = {
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('${api.name} API Error:', error);
      throw error;
    }
  }

  public async getData<T>(): Promise<${api.name}Response<T>> {
    return this.makeRequest<T>('/data');
  }
}

// Usage example
const client = new ${api.name}Client({
  apiKey: 'YOUR_API_KEY'
});

// Example usage with proper typing
client.getData<any>()
  .then(response => {
    console.log('Success:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`
    },
    python: {
      vanilla: `"""
${api.name} Integration
${api.description}
"""

import requests
import json
from typing import Dict, Any, Optional

class ${api.name}Client:
    def __init__(self, api_key: str, base_url: Optional[str] = None):
        self.api_key = api_key
        self.base_url = base_url or "https://api.${api.name.toLowerCase()}.com"
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        })
    
    def _make_request(self, endpoint: str, method: str = "GET", **kwargs) -> Dict[str, Any]:
        """Make HTTP request to ${api.name} API"""
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self.session.request(method, url, **kwargs)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"${api.name} API Error: {e}")
            raise
    
    def get_data(self) -> Dict[str, Any]:
        """Get data from ${api.name} API"""
        return self._make_request("/data")
    
    def post_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Post data to ${api.name} API"""
        return self._make_request("/data", method="POST", json=data)

# Usage example
if __name__ == "__main__":
    client = ${api.name}Client(api_key="YOUR_API_KEY")
    
    try:
        data = client.get_data()
        print("Success:", json.dumps(data, indent=2))
    except Exception as error:
        print(f"Error: {error}")`,
      django: `"""
${api.name} Django Integration
${api.description}
"""

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import requests
import json

class ${api.name}Service:
    def __init__(self):
        self.api_key = getattr(settings, '${api.name.toUpperCase()}_API_KEY', '')
        self.base_url = getattr(settings, '${api.name.toUpperCase()}_BASE_URL', 'https://api.${api.name.toLowerCase()}.com')
    
    def _make_request(self, endpoint, method='GET', data=None):
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
        
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=headers,
                json=data if data else None
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f"${api.name} API Error: {str(e)}")
    
    def get_data(self):
        return self._make_request('/data')

# Django views
@require_http_methods(["GET"])
def get_${api.name.toLowerCase()}_data(request):
    try:
        service = ${api.name}Service()
        data = service.get_data()
        return JsonResponse({'success': True, 'data': data})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

# Add to settings.py:
# ${api.name.toUpperCase()}_API_KEY = 'your_api_key_here'`
    },
    php: {
      vanilla: `<?php
/**
 * ${api.name} Integration
 * ${api.description}
 */

class ${api.name}Client {
    private $apiKey;
    private $baseURL;
    
    public function __construct($apiKey, $baseURL = null) {
        $this->apiKey = $apiKey;
        $this->baseURL = $baseURL ?: 'https://api.${api.name.toLowerCase()}.com';
    }
    
    private function makeRequest($endpoint, $method = 'GET', $data = null) {
        $url = $this->baseURL . $endpoint;
        
        $headers = [
            'Authorization: Bearer ' . $this->apiKey,
            'Content-Type: application/json'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        
        if ($data && in_array($method, ['POST', 'PUT', 'PATCH'])) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode >= 400) {
            throw new Exception("${api.name} API Error: HTTP $httpCode");
        }
        
        return json_decode($response, true);
    }
    
    public function getData() {
        return $this->makeRequest('/data');
    }
    
    public function postData($data) {
        return $this->makeRequest('/data', 'POST', $data);
    }
}

// Usage example
try {
    $client = new ${api.name}Client('YOUR_API_KEY');
    $data = $client->getData();
    echo json_encode($data, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>`
    },
    go: {
      vanilla: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

// ${api.name}Client represents the API client
type ${api.name}Client struct {
    APIKey  string
    BaseURL string
    client  *http.Client
}

// New${api.name}Client creates a new ${api.name} client
func New${api.name}Client(apiKey string) *${api.name}Client {
    return &${api.name}Client{
        APIKey:  apiKey,
        BaseURL: "https://api.${api.name.toLowerCase()}.com",
        client: &http.Client{
            Timeout: time.Second * 30,
        },
    }
}

// makeRequest makes an HTTP request to the ${api.name} API
func (c *${api.name}Client) makeRequest(endpoint, method string, data interface{}) (map[string]interface{}, error) {
    url := c.BaseURL + endpoint
    
    var body io.Reader
    if data != nil {
        jsonData, err := json.Marshal(data)
        if err != nil {
            return nil, fmt.Errorf("error marshaling data: %v", err)
        }
        body = bytes.NewBuffer(jsonData)
    }
    
    req, err := http.NewRequest(method, url, body)
    if err != nil {
        return nil, fmt.Errorf("error creating request: %v", err)
    }
    
    req.Header.Set("Authorization", "Bearer "+c.APIKey)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := c.client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("error making request: %v", err)
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("API error: %s", resp.Status)
    }
    
    var result map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, fmt.Errorf("error decoding response: %v", err)
    }
    
    return result, nil
}

// GetData gets data from ${api.name} API
func (c *${api.name}Client) GetData() (map[string]interface{}, error) {
    return c.makeRequest("/data", "GET", nil)
}

// PostData posts data to ${api.name} API
func (c *${api.name}Client) PostData(data map[string]interface{}) (map[string]interface{}, error) {
    return c.makeRequest("/data", "POST", data)
}

func main() {
    client := New${api.name}Client("YOUR_API_KEY")
    
    data, err := client.GetData()
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    jsonData, _ := json.MarshalIndent(data, "", "  ")
    fmt.Printf("Success: %s\\n", jsonData)
}`
    },
    rust: {
      vanilla: `use reqwest::{Client, Error as ReqwestError};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

/// ${api.name} API Client
/// ${api.description}
pub struct ${api.name}Client {
    api_key: String,
    base_url: String,
    client: Client,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse {
    pub success: bool,
    pub data: Option<Value>,
    pub error: Option<String>,
}

impl ${api.name}Client {
    /// Create a new ${api.name} client
    pub fn new(api_key: String) -> Self {
        Self {
            api_key,
            base_url: "https://api.${api.name.toLowerCase()}.com".to_string(),
            client: Client::new(),
        }
    }
    
    /// Make a request to the ${api.name} API
    async fn make_request(
        &self,
        endpoint: &str,
        method: &str,
        data: Option<&Value>,
    ) -> Result<Value, ReqwestError> {
        let url = format!("{}{}", self.base_url, endpoint);
        
        let mut request = match method.to_uppercase().as_str() {
            "GET" => self.client.get(&url),
            "POST" => self.client.post(&url),
            "PUT" => self.client.put(&url),
            "DELETE" => self.client.delete(&url),
            _ => self.client.get(&url),
        };
        
        request = request
            .header("Authorization", format!("Bearer {}", self.api_key))
            .header("Content-Type", "application/json");
        
        if let Some(body) = data {
            request = request.json(body);
        }
        
        let response = request.send().await?;
        let json: Value = response.json().await?;
        
        Ok(json)
    }
    
    /// Get data from ${api.name} API
    pub async fn get_data(&self) -> Result<Value, ReqwestError> {
        self.make_request("/data", "GET", None).await
    }
    
    /// Post data to ${api.name} API
    pub async fn post_data(&self, data: &Value) -> Result<Value, ReqwestError> {
        self.make_request("/data", "POST", Some(data)).await
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = ${api.name}Client::new("YOUR_API_KEY".to_string());
    
    match client.get_data().await {
        Ok(data) => {
            println!("Success: {}", serde_json::to_string_pretty(&data)?);
        }
        Err(error) => {
            eprintln!("Error: {}", error);
        }
    }
    
    Ok(())
}

// Add to Cargo.toml:
// [dependencies]
// reqwest = { version = "0.11", features = ["json"] }
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"
// tokio = { version = "1", features = ["full"] }`
    }
  }

  return templates[language]?.[framework] || templates[language]?.vanilla || `// ${api.name} integration code not available for ${language} with ${framework} framework`
}

