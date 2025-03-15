
import { getScores, Score } from './scoreManager';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Rules content for export
const rulesContent = {
  title: "DevineLe Challenge - Règles du Jeu",
  introduction: "Un jeu de devinette de nombre simple et amusant",
  rules: [
    "Objectif: Deviner un nombre entre 1 et 100",
    "Tentatives: Maximum de 10 essais",
    "Points: Score = Tentatives restantes × 10",
    "Victoire: Trouver le nombre exact",
    "Défaite: Épuiser les 10 tentatives"
  ],
  features: [
    "Mode Interface Graphique: Expérience de jeu intuitive et visuelle",
    "Mode Console: Expérience alternative dans un terminal simulé",
    "Système de Score: Calcul automatique des points et tableau de classement"
  ],
  formula: "Score = Tentatives restantes × 10 (si victoire), 0 (si défaite)"
};

// Function to export rules to JSON
export const exportRulesToJSON = () => {
  const dataStr = JSON.stringify(rulesContent, null, 2);
  downloadJSON(dataStr, 'devinele-rules.json');
};

// Function to export scores to JSON
export const exportScoresToJSON = () => {
  const scores = getScores();
  const dataStr = JSON.stringify(scores, null, 2);
  downloadJSON(dataStr, 'devinele-scores.json');
};

// Function to export rules to PDF
export const exportRulesToPDF = () => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text(rulesContent.title, 20, 20);
  
  // Add introduction
  doc.setFontSize(12);
  doc.text(rulesContent.introduction, 20, 30);
  
  // Add rules
  doc.setFontSize(16);
  doc.text("Règles du Jeu:", 20, 45);
  
  let yPosition = 55;
  rulesContent.rules.forEach((rule, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${rule}`, 25, yPosition);
    yPosition += 10;
  });
  
  // Add formula
  doc.setFontSize(16);
  doc.text("Formule de Score:", 20, yPosition + 5);
  doc.setFontSize(12);
  doc.text(`Score = Tentatives restantes × 10 (si victoire), 0 (si défaite)`, 25, yPosition + 15);
  
  // Add features
  yPosition += 25;
  doc.setFontSize(16);
  doc.text("Fonctionnalités:", 20, yPosition);
  
  yPosition += 10;
  rulesContent.features.forEach((feature, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${feature}`, 25, yPosition);
    yPosition += 10;
  });
  
  doc.save('devinele-rules.pdf');
};

// Function to export scores to PDF
export const exportScoresToPDF = () => {
  const scores = getScores();
  if (scores.length === 0) return;
  
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text("DevineLe Challenge - Tableau des Scores", 20, 20);
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Create table data
  const tableColumn = ["Rang", "Nom d'utilisateur", "Score", "Date"];
  const tableRows = scores.map((score, index) => [
    (index + 1).toString(),
    score.username,
    score.score.toString(),
    formatDate(score.date)
  ]);
  
  // Add table to document
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 12, cellPadding: 5 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });
  
  doc.save('devinele-scores.pdf');
};

// Helper function to trigger download
const downloadJSON = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

// Function to generate LaTeX document with rules
export const generateLaTeXRules = () => {
  const latex = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage{xcolor}

\\title{DevineLe Challenge - Documentation du Jeu}
\\author{Projet Paradigmes de Programmation}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
${rulesContent.introduction}

\\section{Règles du Jeu}
\\begin{itemize}
${rulesContent.rules.map(rule => `  \\item ${rule}`).join('\n')}
\\end{itemize}

\\section{Formule Mathématique du Score}
\\begin{equation}
Score = 
\\begin{cases}
\\text{Tentatives restantes} \\times 10, & \\text{si victoire} \\\\
0, & \\text{si défaite}
\\end{cases}
\\end{equation}

\\section{Fonctionnalités}
\\begin{itemize}
${rulesContent.features.map(feature => `  \\item ${feature}`).join('\n')}
\\end{itemize}

\\end{document}
  `;
  
  const blob = new Blob([latex], { type: 'application/x-tex' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'devinele-documentation.tex';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};
