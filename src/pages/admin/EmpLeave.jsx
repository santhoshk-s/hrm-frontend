import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [keywords, setKeywords] = useState("JavaScript, React, Node.js, MongoDB");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Effect to log or process initial actions
  useEffect(() => {
    console.log("Applicant Tracking System initialized.");
  }, []);

  // Handle file upload
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setAnalysisResult(null); // Reset result on file change
  };

  // Submit the file for analysis
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    setLoading(true);
    const fileType = file.type;

    try {
      if (fileType === "application/pdf") {
        await parsePDF(file);
      } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        await parseDocx(file);
      } else if (fileType === "text/plain") {
        await parseTxt(file);
      } else {
        alert("Unsupported file type. Please upload a .pdf, .docx, or .txt file.");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  // Parse PDF
  const parsePDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }

    analyzeContent(text);
  };

  // Parse DOCX
  const parseDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value: text } = await mammoth.extractRawText({ arrayBuffer });
    analyzeContent(text);
  };

  // Parse TXT
  const parseTxt = async (file) => {
    const reader = new FileReader();
    reader.onload = (e) => analyzeContent(e.target.result);
    reader.readAsText(file);
  };

  // Analyze content and extract keywords
  const analyzeContent = (text) => {
    const extractedData = extractFields(text);
    const keywordList = keywords.split(",").map((kw) => kw.trim());
    const matchedKeywords = keywordList.filter((kw) =>
      text.toLowerCase().includes(kw.toLowerCase())
    );
    const matchScore = ((matchedKeywords.length / keywordList.length) * 100).toFixed(2);

    setAnalysisResult({
      ...extractedData,
      matchedKeywords,
      matchScore,
    });
  };

  // Extract fields using regex
  const extractFields = (text) => {
    const email = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)?.[0] || "Not Found";
    const phone = text.match(/\b\d{10}\b|\b(?:\d{3}[-.\s]?){2}\d{4}\b/)?.[0] || "Not Found";
    const name = text.split("\n")[0]?.trim() || "Not Found";
    const qualifications = text.match(/(Bachelor|Master|PhD|Diploma|Engineer)/i)?.[0] || "Not Found";

    return { name, email, phone, qualifications };
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Applicant Tracking System
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField
            type="file"
            fullWidth
            inputProps={{ accept: ".pdf,.docx,.txt" }}
            onChange={handleFileChange}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Enter Keywords (comma-separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            helperText="E.g., JavaScript, React, Node.js"
          />
        </Box>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Analyze Resume"}
          </Button>
        </Box>
        {analysisResult && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Analysis Result
            </Typography>
            <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ResumeAnalyzer;
