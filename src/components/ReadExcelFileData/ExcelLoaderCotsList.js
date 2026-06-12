// IMPORTATION DATAS EXCEL FILE

import * as XLSX from "xlsx";
 
export async function loadExcelDataCotsList() {
    try {
        const res = await fetch(process.env.PUBLIC_URL + "/data/CotsList.xlsx");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const ab = await res.arrayBuffer();
        const dataArray = new Uint8Array(ab);
        const workbook = XLSX.read(dataArray, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
        //console.log("res loadExcelDataCotsList ***********", jsonData);
        return jsonData;
    } catch (error) {
        console.error("Erreur dans loadExcelDataCotsList :", error);
        return [];
    }
}

export async function loadExcelRequestsMessagesCotsList() {
    try {
        const res = await fetch(process.env.PUBLIC_URL + "/data/CotsList.xlsx");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const ab = await res.arrayBuffer();
        const dataArray = new Uint8Array(ab);
        const workbook = XLSX.read(dataArray, { type: "array" });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: null });
        //console.log("res loadExcelMessagesCotsList ***********", jsonData);
        return jsonData;
    } catch (error) {
        console.error("Erreur dans loadExcelMessagesCotsList :", error);
        return [];
    }
}

export async function loadExcelIncidentsMessagesCotsList() {
    try {
        const res = await fetch(process.env.PUBLIC_URL + "/data/CotsList.xlsx");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const ab = await res.arrayBuffer();
        const dataArray = new Uint8Array(ab);
        const workbook = XLSX.read(dataArray, { type: "array" });
        const sheetName = workbook.SheetNames[2];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: null });
        //console.log("res loadExcelMessagesCotsList ***********", jsonData);
        return jsonData;
    } catch (error) {
        console.error("Erreur dans loadExcelMessagesCotsList :", error);
        return [];
    }
}

