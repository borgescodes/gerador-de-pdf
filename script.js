document.getElementById('invoiceForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
        const product = document.getElementById('product').value;
        const description = document.getElementById('description').value;
        const value = document.getElementById('value').value;
        const today = new Date().toLocaleDateString('pt-BR');

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        const templateImg = await loadImage('./template.png');
        //console.log('img renderizou');

        doc.addImage(templateImg, 'PNG', 0, 0, 210, 297);
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        //doc.text('Orçamento', 105, 40, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Data: ${today}`, 10, 60);
        doc.setFontSize(16);
        doc.text(`Produto: ${product}`, 10, 80);
        doc.text('Descrição:', 10, 100);
        doc.text(description, 10, 110, { maxWidth: 190 });
        doc.text(`Valor: R$ ${value}`, 10, 160);

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        const pdfPreview = document.getElementById('pdfPreview');
        pdfPreview.src = pdfUrl;

        //console.log('deu certo');
    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        alert('Ocorreu um erro ao gerar o PDF. Mano olha o console pra ver.');
    }
});

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Erro ao carregar a imagem: ${url}`));
        img.src = url;
    });
}
