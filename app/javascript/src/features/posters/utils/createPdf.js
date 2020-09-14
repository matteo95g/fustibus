import { jsPDF } from "jspdf";
import strings from "@common/strings";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const EMPTY_DIV = "<div></div>";

const createPdf = (data) => {
  const doc = new jsPDF("p", "mm", "a0");

  const title = data.attributes.title ? data.attributes.title : EMPTY_DIV;
  const abstract = data.attributes.abstract ? stateToHTML(convertFromRaw(JSON.parse(data.attributes.abstract))) : EMPTY_DIV;
  const introduction = data.attributes.introduction
    ? stateToHTML(convertFromRaw(JSON.parse(data.attributes.introduction)))
    : EMPTY_DIV;
  const methodology = data.attributes.methodology
    ? stateToHTML(convertFromRaw(JSON.parse(data.attributes.methodology)))
    : EMPTY_DIV;
  const results = data.attributes.results ? stateToHTML(convertFromRaw(JSON.parse(data.attributes.results))) : EMPTY_DIV;
  const conclusions = data.attributes.conclusions
    ? stateToHTML(convertFromRaw(JSON.parse(data.attributes.conclusions)))
    : EMPTY_DIV;
  const bibliography = data.attributes.bibliography
    ? stateToHTML(convertFromRaw(JSON.parse(data.attributes.bibliography)))
    : EMPTY_DIV;
  const acknowledgments = data.attributes.acknowledgments
    ? stateToHTML(convertFromRaw(JSON.parse(data.attributes.acknowledgments)))
    : EMPTY_DIV;

  let poster = document.createElement("div");
  poster.style.width = "841mm";
  poster.style.fontSize = "12px";

  let titleDiv = document.createElement("div");
  let titleHeader = document.createElement("H1");
  titleHeader.innerHTML = title;
  titleDiv.appendChild(titleHeader);
  titleDiv.style.margin = "15px";

  let sectionsDiv = document.createElement("div");
  sectionsDiv.style.display = "flex";

  let column1 = document.createElement("div");
  let column2 = document.createElement("div");
  let column3 = document.createElement("div");
  column1.style.display = "flex";
  column2.style.display = "flex";
  column3.style.display = "flex";
  column1.style.flexDirection = "column";
  column2.style.flexDirection = "column";
  column3.style.flexDirection = "column";
  column1.style.width = "73mm";
  column2.style.width = "73mm";
  column3.style.width = "73mm";

  let abstractDiv = document.createElement("div");
  let abstractHeader = document.createElement("H3");
  let abstractContentDiv = document.createElement("div");
  let abstractTitle = document.createTextNode(`${strings.Poster.sections.abstract}`);
  abstractHeader.appendChild(abstractTitle);
  abstractContentDiv.innerHTML = abstract;
  abstractDiv.appendChild(abstractHeader);
  abstractDiv.appendChild(abstractContentDiv);
  abstractDiv.style.margin = "15px";
  abstractContentDiv.style.border = "1px solid #ddd";
  abstractContentDiv.style.padding = "5px";

  let introductionDiv = document.createElement("div");
  let introductionHeader = document.createElement("H3");
  let introductionContentDiv = document.createElement("div");
  let introductionTitle = document.createTextNode(`${strings.Poster.sections.introduction}`);
  introductionHeader.appendChild(introductionTitle);
  introductionContentDiv.innerHTML = introduction;
  introductionDiv.appendChild(introductionHeader);
  introductionDiv.appendChild(introductionContentDiv);
  introductionDiv.style.margin = "15px";
  introductionContentDiv.style.border = "1px solid #ddd";
  introductionContentDiv.style.padding = "5px";

  let methodologyDiv = document.createElement("div");
  let methodologyHeader = document.createElement("H3");
  let methodologyContentDiv = document.createElement("div");
  let methodologyTitle = document.createTextNode(`${strings.Poster.sections.methodology}`);
  methodologyHeader.appendChild(methodologyTitle);
  methodologyContentDiv.innerHTML = methodology;
  methodologyDiv.appendChild(methodologyHeader);
  methodologyDiv.appendChild(methodologyContentDiv);
  methodologyDiv.style.margin = "15px";
  methodologyContentDiv.style.border = "1px solid #ddd";
  methodologyContentDiv.style.padding = "5px";

  let resultsDiv = document.createElement("div");
  let resultsHeader = document.createElement("H3");
  let resultsContentDiv = document.createElement("div");
  let resultsTitle = document.createTextNode(`${strings.Poster.sections.results}`);
  resultsHeader.appendChild(resultsTitle);
  resultsContentDiv.innerHTML = results;
  resultsDiv.appendChild(resultsHeader);
  resultsDiv.appendChild(resultsContentDiv);
  resultsDiv.style.margin = "15px";
  resultsContentDiv.style.border = "1px solid #ddd";
  resultsContentDiv.style.padding = "5px";

  let conclusionsDiv = document.createElement("div");
  let conclusionsHeader = document.createElement("H3");
  let conclusionsContentDiv = document.createElement("div");
  let conclusionsTitle = document.createTextNode(`${strings.Poster.sections.conclusions}`);
  conclusionsHeader.appendChild(conclusionsTitle);
  conclusionsContentDiv.innerHTML = conclusions;
  conclusionsDiv.appendChild(conclusionsHeader);
  conclusionsDiv.appendChild(conclusionsContentDiv);
  conclusionsDiv.style.margin = "15px";
  conclusionsContentDiv.style.border = "1px solid #ddd";
  conclusionsContentDiv.style.padding = "5px";

  let bibliographyDiv = document.createElement("div");
  let bibliographyHeader = document.createElement("H3");
  let bibliographyContentDiv = document.createElement("div");
  let bibliographyTitle = document.createTextNode(`${strings.Poster.sections.bibliography}`);
  bibliographyHeader.appendChild(bibliographyTitle);
  bibliographyContentDiv.innerHTML = bibliography;
  bibliographyDiv.appendChild(bibliographyHeader);
  bibliographyDiv.appendChild(bibliographyContentDiv);
  bibliographyDiv.style.margin = "15px";
  bibliographyContentDiv.style.border = "1px solid #ddd";
  bibliographyContentDiv.style.padding = "5px";

  let acknowledgmentsDiv = document.createElement("div");
  let acknowledgmentsHeader = document.createElement("H3");
  let acknowledgmentsContentDiv = document.createElement("div");
  let acknowledgmentsTitle = document.createTextNode(`${strings.Poster.sections.acknowledgments}`);
  acknowledgmentsHeader.appendChild(acknowledgmentsTitle);
  acknowledgmentsContentDiv.innerHTML = acknowledgments;
  acknowledgmentsDiv.appendChild(acknowledgmentsHeader);
  acknowledgmentsDiv.appendChild(acknowledgmentsContentDiv);
  acknowledgmentsDiv.style.margin = "15px";
  acknowledgmentsContentDiv.style.border = "1px solid #ddd";
  acknowledgmentsContentDiv.style.padding = "5px";

  column1.appendChild(abstractDiv);
  column1.appendChild(introductionDiv);
  column1.appendChild(methodologyDiv);

  column2.appendChild(resultsDiv);

  column3.appendChild(conclusionsDiv);
  column3.appendChild(bibliographyDiv);
  column3.appendChild(acknowledgmentsDiv);

  sectionsDiv.appendChild(column1);
  sectionsDiv.appendChild(column2);
  sectionsDiv.appendChild(column3);

  poster.appendChild(titleDiv);
  poster.appendChild(sectionsDiv);

  doc.html(poster).then(() => doc.save("poster.pdf"));
};

export default createPdf;
