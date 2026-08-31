import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

type InvoiceItem = {
  beatTitle: string;
  license: string;
  price: number;
};

type InvoiceCustomer = {
  name: string | null;
  email: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  postalCode: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
};

type GenerateInvoiceParams = {
  invoiceNumber: string;
  invoiceDate: Date;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  total: number;
  currency?: string;
};

const SELLER = {
  name: "Jérôme RANTIER",
  businessName: "J-R Beats",
  legalStatus: "Entrepreneur individuel",
  addressLine1: "9 Avenue Girardin",
  postalCode: "95880",
  city: "Enghien-les-Bains",
  country: "France",
  email: "j-rbeats@hotmail.com",
  siren: "108 822 958",
  siret: "108 822 958 00014",
  ape: "90.03B",
};

function formatMoney(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function safeText(
  value: string | null | undefined
) {
  return value?.trim() || "";
}

export async function generateInvoicePdf({
  invoiceNumber,
  invoiceDate,
  customer,
  items,
  total,
  currency = "EUR",
}: GenerateInvoiceParams) {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([595.28, 841.89]);

  const regularFont =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const boldFont =
    await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

  const { width, height } = page.getSize();

  const margin = 50;

  let y = height - 55;

  const drawText = (
    text: string,
    x: number,
    currentY: number,
    options?: {
      size?: number;
      bold?: boolean;
    }
  ) => {
    page.drawText(text, {
      x,
      y: currentY,
      size: options?.size ?? 10,
      font: options?.bold
        ? boldFont
        : regularFont,
      color: rgb(0.12, 0.12, 0.12),
    });
  };

  // --------------------------------------------------
  // EN-TÊTE
  // --------------------------------------------------

  drawText(
    SELLER.businessName,
    margin,
    y,
    {
      size: 22,
      bold: true,
    }
  );

  drawText(
    "FACTURE",
    width - margin - 105,
    y,
    {
      size: 20,
      bold: true,
    }
  );

  y -= 30;

  drawText(
    `${SELLER.name} - ${SELLER.legalStatus}`,
    margin,
    y,
    { bold: true }
  );

  y -= 16;

  drawText(
    SELLER.addressLine1,
    margin,
    y
  );

  y -= 14;

  drawText(
    `${SELLER.postalCode} ${SELLER.city}`,
    margin,
    y
  );

  y -= 14;

  drawText(
    SELLER.country,
    margin,
    y
  );

  y -= 14;

  drawText(
    SELLER.email,
    margin,
    y
  );

  y -= 20;

  drawText(
    `SIREN : ${SELLER.siren}`,
    margin,
    y
  );

  y -= 14;

  drawText(
    `SIRET : ${SELLER.siret}`,
    margin,
    y
  );

  y -= 14;

  drawText(
    `APE : ${SELLER.ape}`,
    margin,
    y
  );

  // --------------------------------------------------
  // INFORMATIONS FACTURE
  // --------------------------------------------------

  const invoiceInfoX = width - 245;
  let invoiceInfoY = height - 100;

  drawText(
    `Facture n° ${invoiceNumber}`,
    invoiceInfoX,
    invoiceInfoY,
    { bold: true }
  );

  invoiceInfoY -= 18;

  drawText(
    `Date : ${formatDate(invoiceDate)}`,
    invoiceInfoX,
    invoiceInfoY
  );

  // --------------------------------------------------
  // CLIENT
  // --------------------------------------------------

  y -= 45;

  drawText(
    "FACTURÉ À",
    margin,
    y,
    {
      size: 11,
      bold: true,
    }
  );

  y -= 22;

  if (safeText(customer.name)) {
    drawText(
      safeText(customer.name),
      margin,
      y,
      { bold: true }
    );

    y -= 15;
  }

  if (safeText(customer.addressLine1)) {
    drawText(
      safeText(customer.addressLine1),
      margin,
      y
    );

    y -= 14;
  }

  if (safeText(customer.addressLine2)) {
    drawText(
      safeText(customer.addressLine2),
      margin,
      y
    );

    y -= 14;
  }

  const cityLine = [
    safeText(customer.postalCode),
    safeText(customer.city),
  ]
    .filter(Boolean)
    .join(" ");

  if (cityLine) {
    drawText(
      cityLine,
      margin,
      y
    );

    y -= 14;
  }

  if (safeText(customer.state)) {
    drawText(
      safeText(customer.state),
      margin,
      y
    );

    y -= 14;
  }

  if (safeText(customer.country)) {
    drawText(
      safeText(customer.country),
      margin,
      y
    );

    y -= 14;
  }

  if (safeText(customer.email)) {
    drawText(
      safeText(customer.email),
      margin,
      y
    );

    y -= 14;
  }

  // --------------------------------------------------
  // TABLEAU
  // --------------------------------------------------

  y -= 30;

  const tableTop = y;

  page.drawRectangle({
    x: margin,
    y: tableTop - 24,
    width: width - margin * 2,
    height: 24,
    color: rgb(0.94, 0.94, 0.94),
  });

  drawText(
    "Beat",
    margin + 8,
    tableTop - 16,
    { bold: true }
  );

  drawText(
    "Licence",
    285,
    tableTop - 16,
    { bold: true }
  );

  drawText(
    "Prix",
    width - margin - 80,
    tableTop - 16,
    { bold: true }
  );

  y = tableTop - 45;

  for (const item of items) {
    drawText(
      item.beatTitle,
      margin + 8,
      y
    );

    drawText(
      item.license.toUpperCase(),
      285,
      y
    );

    drawText(
      formatMoney(
        item.price,
        currency
      ),
      width - margin - 80,
      y
    );

    y -= 24;
  }

  // --------------------------------------------------
  // TOTAL
  // --------------------------------------------------

  y -= 15;

  page.drawLine({
    start: {
      x: 330,
      y: y + 10,
    },
    end: {
      x: width - margin,
      y: y + 10,
    },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7),
  });

  drawText(
    "Total",
    350,
    y - 10,
    {
      size: 12,
      bold: true,
    }
  );

  drawText(
    formatMoney(total, currency),
    width - margin - 100,
    y - 10,
    {
      size: 12,
      bold: true,
    }
  );

  // --------------------------------------------------
  // TVA
  // --------------------------------------------------

  y -= 65;

  drawText(
    "TVA non applicable, art. 293 B du CGI",
    margin,
    y,
    {
      size: 9,
      bold: true,
    }
  );

  y -= 18;

  drawText(
    "Vente de contenu numérique - licence d'utilisation d'une œuvre musicale.",
    margin,
    y,
    {
      size: 9,
    }
  );

  // --------------------------------------------------
  // PIED DE PAGE
  // --------------------------------------------------

  drawText(
    `${SELLER.businessName} - ${SELLER.name} - ${SELLER.legalStatus}`,
    margin,
    45,
    {
      size: 8,
    }
  );

  drawText(
    `SIREN ${SELLER.siren} - SIRET ${SELLER.siret} - APE ${SELLER.ape}`,
    margin,
    32,
    {
      size: 8,
    }
  );

  const pdfBytes =
    await pdfDoc.save();

  return pdfBytes;
}