import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'react-google-charts';
import { Typography } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CustomButton from './CustomButton';
import { findTaskByProject } from '../../../services/task.service';

const GanttChart = () => {
  const [data, setData] = useState([
    [
      { type: 'string', label: 'ID de la Tarea' },
      { type: 'string', label: 'Nombre de la Tarea' },
      { type: 'string', label: 'Recurso' },
      { type: 'date', label: 'Fecha de Inicio' },
      { type: 'date', label: 'Fecha de Fin' },
      { type: 'number', label: 'Duración' },
      { type: 'number', label: 'Porcentaje Completo' },
      { type: 'string', label: 'Dependencias' },
    ],
    ['1', 'Lanzar Producto SaaS', null, new Date(2024, 0, 6), new Date(2024, 2, 10), null, 0, null],
    ['2', 'Configurar servidor web', null, new Date(2024, 0, 6), new Date(2024, 0, 13), null, 50, null],
    ['3', 'Instalar Apache', 'Configurar servidor web', new Date(2024, 0, 13), new Date(2024, 0, 20), null, 50, null],
    ['4', 'Configurar firewall', 'Configurar servidor web', new Date(2024, 0, 20), new Date(2024, 0, 27), null, 50, null],
    ['5', 'Configurar balanceador de carga', 'Configurar servidor web', new Date(2024, 0, 27), new Date(2024, 1, 3), null, 50, null],
    ['6', 'Configurar puertos', 'Configurar servidor web', new Date(2024, 1, 3), new Date(2024, 1, 10), null, 50, null],
    ['7', 'Realizar pruebas', null, new Date(2024, 1, 10), new Date(2024, 1, 17), null, 0, null],
    ['8', 'Diseño del Sitio Web', null, new Date(2024, 1, 10), new Date(2024, 2, 10), null, 0, null],
  ]);

  const chartRef = useRef(null);
  const [titleProject, setTitleProject] = useState('Nombre del Proyecto'); // Asegúrate de establecer el nombre del proyecto

  const options = {
    height: 400,
    gantt: {
      criticalPathEnabled: false,
      criticalPathStyle: {
        stroke: '#e64a19',
        strokeWidth: 5,
      },
      arrow: {
        angle: 100,
        width: 5,
        color: 'green',
        radius: 0,
      },
    },
  };

  const handleDownloadPDF = () => {
    const input = chartRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // Añadir título del proyecto centrado
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text(titleProject, pdfWidth / 2.2, 20, { align: 'center' });
  
      // Añadir subtítulo "Cronograma" a la izquierda
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Cronograma', 15, 30);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const dateText = `Fecha: ${new Date().toLocaleDateString()}`;
      pdf.text(dateText, 15, pdfHeight + 50);
  
      // Añadir imagen del cronograma
      pdf.addImage(imgData, 'PNG', 10, 40, pdfWidth - 20, pdfHeight);
  
      pdf.save(`${titleProject.replace(/\s+/g, '_')}_gantt_chart.pdf`);
    });
  };
  

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       // Asegúrate de que id_project esté definido y sea el correcto
  //       const response = await findTaskByProject(id_project);
  //       const formattedData = response.map(task => [
  //         task.id.toString(),
  //         task.name,
  //         task.project.name, 
  //         new Date(task.start_date),
  //         new Date(task.end_date),
  //         null, 
  //         0, 
  //         null, 
  //       ]);
  //       setData([
  //         [
  //           { type: 'string', label: 'ID de la Tarea' },
  //           { type: 'string', label: 'Nombre de la Tarea' },
  //           { type: 'string', label: 'Recurso' },
  //           { type: 'date', label: 'Fecha de Inicio' },
  //           { type: 'date', label: 'Fecha de Fin' },
  //           { type: 'number', label: 'Duración' },
  //           { type: 'number', label: 'Porcentaje Completo' },
  //           { type: 'string', label: 'Dependencias' },
  //         ],
  //         ...formattedData
  //       ]);
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   };
  //   loadData();
  // }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom marginTop={1} marginLeft={2}>
          Cronograma
        </Typography>
        <CustomButton variant="contained" color="primary" onClick={handleDownloadPDF}>
          Descargar como PDF
        </CustomButton>
      </div>
      <div ref={chartRef}>
        <Chart
          chartType="Gantt"
          width="100%"
          height="50vh"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default GanttChart;
