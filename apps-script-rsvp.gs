/**
 * Apps Script para conectar el formulario de RSVP del sitio con Google Sheets.
 *
 * INSTALACIÓN:
 * 1. Abre tu hoja "CONFIRMACIONES DE BODA STEFANY Y CESAR".
 * 2. Ve a Extensiones > Apps Script.
 * 3. Borra el código de ejemplo y pega TODO este archivo.
 * 4. Guarda (icono de disco o Ctrl+S).
 * 5. Clic en "Implementar" > "Administrar implementaciones" > lápiz de editar
 *    > Versión: "Nueva versión" > Implementar.
 *    (Si nunca has desplegado nada, usa "Nueva implementación" en vez de esto:
 *    Tipo "Aplicación web", Ejecutar como "Yo", Acceso "Cualquier usuario").
 * 6. Copia la URL que termina en /exec y pégala en index.html en:
 *      const RSVP_SCRIPT_URL = '...';
 *
 * NOTA: se usa getSheets()[0] (la primera pestaña) en lugar de buscar por
 * nombre, porque "Tabla_1" es el nombre de una Tabla de Google Sheets, no
 * el nombre real de la pestaña (que es "Hoja 1"). Si más adelante creas
 * varias pestañas y quieres apuntar a una en específico, cambia esa línea
 * por: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1')
 *
 * Si cambias alguna pregunta del formulario, actualiza también el orden
 * de columnas en appendRow() de abajo para que coincida.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = e.parameter;

  sheet.appendRow([
    new Date(),
    p.nombre || '',
    p.asistencia || '',
    p.mensaje || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
