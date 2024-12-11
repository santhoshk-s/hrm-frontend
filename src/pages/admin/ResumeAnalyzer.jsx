import React, { useState } from "react";
import { getDocument } from "pdfjs-dist/build/pdf";

const ResumeAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [iframeSrc, setIframeSrc] = useState("");
  const [pdfDetails, setPdfDetails] = useState({
    name: "",
    address: "",
    skills: "",
    experience: "",
    qualification: "",
    images: [],
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      const fileURL = URL.createObjectURL(file);
      setIframeSrc(fileURL);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    try {
      const pdfData = await parsePDF(uploadedFile);
      setPdfDetails(pdfData);
    } catch (error) {
      console.error("Error analyzing PDF:", error);
      alert("An error occurred while analyzing the PDF.");
    }
  };

  const parsePDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      let textContent = "";
      let images = [];

      // Extract text and images from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const textItems = content.items.map((item) => item.str).join(" ");
        textContent += ` ${textItems}`;

        // Get image (dummy implementation: replace with actual image extraction logic if needed)
        const annotations = await page.getAnnotations();
        annotations.forEach((annotation) => {
          if (annotation.subtype === "Image") {
            const image = annotation.image; // Extract image (depends on PDF structure)
            if (image) {
              images.push(image);
            }
          }
        });
      }

      console.log("Extracted Text Content:", textContent); // Debug log

      // Extract relevant details using regex
      const nameMatch = textContent.match(/Name:\s*(.+)/i);
      const addressMatch = textContent.match(/Address:\s*(.+)/i);
      const skillsMatch = textContent.match(/Skills:\s*(.+)/i);
      const experienceMatch = textContent.match(/Experience:\s*(.+)/i);
      const qualificationMatch = textContent.match(/Qualification:\s*(.+)/i);

      return {
        name: nameMatch?.[1]?.trim() || "Not Found",
        address: addressMatch?.[1]?.trim() || "Not Found",
        skills: skillsMatch?.[1]?.trim() || "Not Found",
        experience: experienceMatch?.[1]?.trim() || "Not Found",
        qualification: qualificationMatch?.[1]?.trim() || "Not Found",
        images: images, // Return extracted images
      };
    } catch (error) {
      console.error("Error parsing PDF:", error);
      return {
        name: "Error",
        address: "Error",
        skills: "Error",
        experience: "Error",
        qualification: "Error",
        images: [],
      };
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", padding: "20px" }}>
      {/* Left side - PDF details */}
      <div
        style={{
          flex: "1",
          border: "1px solid #ccc",
          padding: "20px",
          marginRight: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <h3>Resume Details</h3>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          style={{ margin: "10px 0" }}
        />
        <button
          onClick={handleAnalyze}
          style={{
            margin: "10px 0",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Analyze
        </button>
        <div style={{ marginTop: "20px" }}>
          <p><strong>Name:</strong> {pdfDetails.name}</p>
          <p><strong>Address:</strong> {pdfDetails.address}</p>
          <p><strong>Skills:</strong> {pdfDetails.skills}</p>
          <p><strong>Experience:</strong> {pdfDetails.experience}</p>
          <p><strong>Qualification:</strong> {pdfDetails.qualification}</p>
          {pdfDetails.images.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong>Images:</strong>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {pdfDetails.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Extracted image ${index + 1}`}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Preview/iframe */}
      <div
        style={{
          flex: "2",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <h3>Resume Preview</h3>
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            title="Resume Preview"
            style={{ width: "100%", height: "90%" }}
          />
        ) : (
          <p>No file uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
