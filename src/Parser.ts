import ReactFlow, { Node, Edge, Position } from 'react-flow-renderer';

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

    const columns = columnDefinitions.split(',').map(colDef => {
      const [name, type] = colDef.trim().split(/\s+/);
      return { name, type };
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
  //cardinalities.forEach((cardinality, index) => {
    const { entity1, entity2, cardinality1, cardinality2 } = cardinalities;

    edges.push({
      id: `edge-${entity1}-${entity2}-${0}`,
      source: entity1,
      target: entity2,
      type: 'smoothstep',
      animated: true,
      label: `${cardinality1} <-> ${cardinality2}`,
    });
  //});

  return edges;
};

export const parseCard = (cardinalityStr: string): Cardinality => {
  const regex = /(\w+)\(([^)]+)\)\s*<->\s*(\w+)\(([^)]+)\)/;
  const match = cardinalityStr.match(regex);
  if (match) {
    const [, entity1, cardinality1, entity2, cardinality2] = match;
    return {
      entity1,
      cardinality1,
      entity2,
      cardinality2,
    };
  }
  else {
    const entity1: string = "";
    const cardinality1: string = "";
    const entity2: string = "";
    const cardinality2: string = "";
    return {entity1, cardinality1, entity2, cardinality2};
  }
};


