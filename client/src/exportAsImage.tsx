import html2canvas from "html2canvas";

const exportAsImage = async (el: HTMLElement, imageFileName: string) => {
    const canvas = await html2canvas(el, {backgroundColor:null});
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);

};

const downloadImage = (blob: any, fileName: any) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style.cssText = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
};

export default exportAsImage;