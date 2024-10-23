import { Edge } from 'react-flow-renderer';

export const parseSQL = (sql: string) => {
  const tables: any[] = [];
  const statements = sql.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.startsWith('CREATE TABLE'));

  for (const statement of statements) {
    const tableNameMatch = statement.match(/CREATE TABLE\s+(\w+)/i);
    if (!tableNameMatch) continue;
    const tableName = tableNameMatch[1];

    const columnDefinitionsMatch = statement.match(/\((.+)\)/s);
    if (!columnDefinitionsMatch) continue;
    const columnDefinitions = columnDefinitionsMatch[1].trim();

    const columns: any[] = [];
    let primaryKeyColumns: string[] = [];
    let foreignKeyColumns: { column: string; references: string }[] = [];

    const columnDefs = columnDefinitions.split(',').map(colDef => colDef.trim());

    columnDefs.forEach(colDef => {
      const isPrimaryKey = colDef.includes('PRIMARY KEY');
      if (colDef.startsWith('PRIMARY KEY') || isPrimaryKey) {
        const pkMatch = colDef.match(/\((.+)\)/);
        if (pkMatch) {
          primaryKeyColumns = pkMatch[1].split(',').map(col => col.trim());
          const [name, type] = colDef.split(/\s+/);
          primaryKeyColumns.push( name );
          columns.push({ name, type });
        }
        else {
          const [name, type] = colDef.split(/\s+/);
          primaryKeyColumns.push( name );
          columns.push({ name, type });
        }
      }
      else if (colDef.startsWith('FOREIGN KEY')) {
        const fkMatch = colDef.match(/\((\w+)\)\s+REFERENCES\s+(\w+)/);
        if (fkMatch) {
          foreignKeyColumns.push({ column: fkMatch[1], references: fkMatch[2] });
        }
      }
      else {
        const [name, type] = colDef.split(/\s+/);
        columns.push({ name, type });
      }
    });

    columns.forEach(column => {
      if (primaryKeyColumns.includes(column.name)) {
        column.primaryKey = true;
      }
    });

    foreignKeyColumns.forEach(fk => {
      const column = columns.find(col => col.name === fk.column);
      if (column) {
        column.foreignKey = fk.references;
      }
    });

    tables.push({ tableName, columns });
  }

  return tables;
};


export interface Cardinality {
  entity1: string,
  cardinality1: string,
  entity2: string,
  cardinality2: string;
}

export const generateEdgesFromCardinality = (cardinalityStr: string): Edge[] => {
  const edges: Edge[] = [];
  const cardinalities = parseCard(cardinalityStr);
  cardinalities.forEach((cardinality,) => {
    const { entity1, entity2, cardinality1, cardinality2 } = cardinality;

    edges.push({
      id: `edge-${entity1}-${entity2}-${0}`,
      source: entity1,
      target: entity2,
      type: 'smoothstep',
      animated: true,
      label: `${cardinality1} <-> ${cardinality2}`,
    });
  });

  return edges;
};

export const parseCard = (cardinalityStr: string): Cardinality[] => {
  const regex = /(\w+)\(([^)]+)\)\s*<->\s*(\w+)\(([^)]+)\)/;
  const lines = cardinalityStr
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('--'));

  const cardinalities: Cardinality[] = [];

  lines.forEach(line => {
    const match = line.match(regex);
    if (match) {
      const [, entity1, cardinality1, entity2, cardinality2] = match;
      cardinalities.push({
        entity1,
        cardinality1,
        entity2,
        cardinality2,
      });
    }
  });

  return cardinalities;
};


