let pyodide = null;

async function startPython(){

if(!pyodide){

pyodide = await loadPyodide();

}

return pyodide;

}

