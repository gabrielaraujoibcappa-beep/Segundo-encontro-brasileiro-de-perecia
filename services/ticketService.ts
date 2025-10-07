const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; 
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
    });
};

const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
};

const drawTextAlongArc = (
    ctx: CanvasRenderingContext2D,
    str: string,
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
) => {
    ctx.save();
    ctx.translate(centerX, centerY);
    const angle = (Math.PI * 2) / str.length;
    ctx.rotate(startAngle);

    for (let i = 0; i < str.length; i++) {
        ctx.save();
        ctx.rotate(i * angle);
        ctx.fillText(str[i], 0, -radius);
        ctx.restore();
    }
    ctx.restore();
};

export const generateTicketImage = async (imageFile: File, city: string): Promise<string> => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    // 1. Draw Background
    ctx.fillStyle = '#0B0F2E'; // Dark navy blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Faint Background Text
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.font = 'bold 90px Poppins';
    ctx.textAlign = 'center';
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 10);
    for (let x = -canvas.width; x < canvas.width * 1.5; x += 350) {
        for (let y = -canvas.height * 1.2; y < canvas.height * 1.5; y += 250) {
            ctx.fillText('EU VOU', x, y);
        }
    }
    ctx.restore();

    // 3. Header Section
    ctx.textAlign = 'left';
    ctx.font = '24px Poppins';
    ctx.fillStyle = 'white';
    ctx.fillText('ENCONTRO BRASILEIRO DE', 90, 150);
    
    ctx.font = 'bold 80px Poppins';
    ctx.fillStyle = '#FFC72C';
    ctx.fillText('I', 90, 230);
    
    ctx.font = '60px Poppins';
    ctx.fillStyle = 'white';
    ctx.fillText('PERÍCIA', 130, 225);
    
    ctx.font = '22px Poppins';
    ctx.fillStyle = '#aaa';
    ctx.fillText('23, 24 E 25 DE OUTUBRO / 2025', 90, 270);
    ctx.fillText('SÃO PAULO / SP', 90, 300);

    // Info Box
    ctx.fillStyle = '#111827';
    ctx.fillRect(580, 150, 420, 150);
    ctx.strokeStyle = '#FFC72C';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(580, 150);
    ctx.lineTo(580, 300);
    ctx.stroke();
    
    ctx.fillStyle = '#FFC72C';
    ctx.font = 'bold 24px Poppins';
    ctx.fillText('2ª EDIÇÃO', 600, 185);

    ctx.fillStyle = 'white';
    ctx.font = '20px Poppins';
    const infoText = ['TRÊS DIAS INTENSOS DE APRENDIZADO,', 'NETWORKING E MUITO', 'CRESCIMENTO PROFISSIONAL'];
    infoText.forEach((line, index) => {
        ctx.fillText(line, 600, 220 + index * 30);
    });

    // 4. Central Circular Element
    const circleX = canvas.width / 2;
    const circleY = 700;
    const photoRadius = 280;
    
    // Draw "EU VOU" text in a circle
    ctx.fillStyle = 'white';
    ctx.font = 'bold 50px Poppins';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textToCircle = ' EU VOU '.repeat(6);
    drawTextAlongArc(ctx, textToCircle, circleX, circleY, 315, -Math.PI / 1.9);

    const userImageURL = await fileToDataURL(imageFile);
    const userImg = await loadImage(userImageURL);
    
    // Clip and draw the user's image in a circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(circleX, circleY, photoRadius, 0, Math.PI * 2, true);
    ctx.clip();
    
    const aspect = userImg.width / userImg.height;
    let drawWidth = photoRadius * 2;
    let drawHeight = drawWidth / aspect;
    if (drawHeight < photoRadius * 2) {
        drawHeight = photoRadius * 2;
        drawWidth = drawHeight * aspect;
    }
    const drawX = circleX - drawWidth / 2;
    const drawY = circleY - drawHeight / 2;
    ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    // 5. Text below circle
    ctx.textAlign = 'center';
    ctx.font = 'bold 90px Poppins';
    ctx.fillStyle = 'white';
    ctx.fillText('IBCAPPA ', circleX, 1180);

    ctx.font = 'bold 70px Poppins';
    ctx.fillStyle = '#FFC72C';
    ctx.fillText(city.toUpperCase(), circleX, 1280);

    // 6. Sponsors section
    ctx.font = '40px Poppins';
    ctx.fillStyle = '#e0dbdbff';
    ctx.textAlign = 'center';
    ctx.fillText('PATROCINADORES:', circleX, 1500);

    ctx.font = '32px Poppins';
    ctx.fillStyle = 'white';
    const sponsorYStart = 1580;
    const lineHeight = 70;

    const sponsors = [
        'Contabilidade Padrão',
        'Ibcappa',
        'Oi gpt',
        'Quick Filler',
        'Sistema do Perito',
        'Time is money',
        'UniBcappa'
    ];

    const maxLineWidth = 900;
    const gap = 60;

    const lines: { sponsors: string[], width: number }[] = [];
    let currentLine: string[] = [];
    let currentLineWidth = 0;

    for (const sponsor of sponsors) {
        const sponsorWidth = ctx.measureText(sponsor).width;
        if (currentLine.length > 0 && currentLineWidth + gap + sponsorWidth > maxLineWidth) {
            lines.push({ sponsors: currentLine, width: currentLineWidth });
            currentLine = [];
            currentLineWidth = 0;
        }
        
        if (currentLine.length > 0) {
            currentLineWidth += gap;
        }
        currentLine.push(sponsor);
        currentLineWidth += sponsorWidth;
    }
    if (currentLine.length > 0) {
        lines.push({ sponsors: currentLine, width: currentLineWidth });
    }
    
    lines.forEach((line, lineIndex) => {
        const sponsorY = sponsorYStart + (lineIndex * lineHeight);
        let currentX = circleX - line.width / 2;

        line.sponsors.forEach((sponsor, sponsorIndex) => {
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(sponsor, currentX, sponsorY);
            currentX += ctx.measureText(sponsor).width;

            if (sponsorIndex < line.sponsors.length - 1) {
                currentX += gap / 2;
                ctx.strokeStyle = '#FFC72C';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(currentX, sponsorY - 20);
                ctx.lineTo(currentX, sponsorY + 20);
                ctx.stroke();
                currentX += gap / 2;
            }
        });
    });


    return canvas.toDataURL('image/png');
};
