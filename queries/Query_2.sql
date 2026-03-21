drop table workflow_history;

SELECT * FROM "transactions";

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'stock_prices';

