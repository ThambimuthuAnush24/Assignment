-- Run this in senior's cse_portfolio database
CREATE TABLE IF NOT EXISTS extracted_transactions (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255),
    transaction_date DATE,
    transaction_type VARCHAR(10),
    doc_ref VARCHAR(100),
    description TEXT,
    quantity INTEGER,
    price DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    stock_symbol VARCHAR(50),
    extracted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_pdf VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS transaction_summaries (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255),
    total_purchases DECIMAL(10,2),
    settlement_balance DECIMAL(10,2),
    total_transaction_cost DECIMAL(10,2),
    statement_period VARCHAR(100),
    extracted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Check exact column definitions
SELECT
  column_name,
  data_type,
  character_maximum_length
FROM information_schema.columns
WHERE table_name = 'extracted_transactions'
ORDER BY ordinal_position;

CREATE TABLE extracted_transactions (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255),
    transaction_date DATE,
    transaction_type VARCHAR(10),
    doc_ref VARCHAR(100),
    description TEXT,
    quantity INTEGER,
    price DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    stock_symbol VARCHAR(50),
    extracted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_pdf VARCHAR(255)
);

SELECT
  column_name,
  data_type,
  character_maximum_length as max_chars
FROM information_schema.columns
WHERE table_name = 'new_transactions'
ORDER BY ordinal_position;

SELECT * FROM new_transactions WHERE doc_ref_no = '2025320985';

DELETE FROM new_transactions;


ALTER TABLE extracted_transactions
ALTER COLUMN transaction_type TYPE VARCHAR(50);

CREATE TABLE new_transactions
(
    id               SERIAL PRIMARY KEY,
    portfolio_id     INTEGER        DEFAULT 1,     -- Default or you can set dynamically
    company_id       INTEGER,                      -- Will map from ticker
    ticker           VARCHAR(50)         NOT NULL, -- Stock symbol from description (e.g., LOLC.N0000)
    transaction_type CHAR(1)             NOT NULL, -- 'B' for Buy, 'R' for Receive, etc.
    quantity         INTEGER             NOT NULL,
    price_per_share  DECIMAL(10, 2)      NOT NULL,
    commission       DECIMAL(10, 2) DEFAULT 0.00,
    transaction_date DATE                NOT NULL,
    doc_ref_no       VARCHAR(100) UNIQUE NOT NULL, -- Primary key for duplicate detection
    source_pdf       VARCHAR(255),
    created_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE new_transactions
  ALTER COLUMN transaction_type TYPE character varying(10);


-- Single table for all 11 calculations + ticker + doc_ref_no
CREATE TABLE portfolio_calculations (
    id SERIAL PRIMARY KEY,

    -- Essential References
    doc_ref_no VARCHAR(100) NOT NULL,
    ticker VARCHAR(50) NOT NULL,
    source_pdf VARCHAR(255),

    -- Basic Transaction Info
    transaction_date VARCHAR(20),
    transaction_type VARCHAR(10),
    quantity DECIMAL(15,4),
    price DECIMAL(15,4),
    total_amount DECIMAL(15,2),

    -- ===== ALL 11 CALCULATIONS =====
    -- 1. Portfolio Current Value
    portfolio_current_value DECIMAL(15,2),

    -- 2. Total Investment (Cost Basis)
    total_investment DECIMAL(15,2),

    -- 3. Unrealized Gain/Loss
    unrealized_gain_loss DECIMAL(15,2),
    unrealized_gain_loss_pct DECIMAL(10,4),

    -- 4. Realized Gain/Loss
    realized_gain_loss DECIMAL(15,2),
    realized_gain_loss_pct DECIMAL(10,4),

    -- 5. Average Cost Per Share
    average_cost_per_share DECIMAL(15,4),

    -- 6. Portfolio Total Return
    portfolio_total_return DECIMAL(15,2),
    portfolio_total_return_pct DECIMAL(10,4),

    -- 7. Sector Allocation Percentage
    sector_allocation_pct DECIMAL(10,4),

    -- 8. Position Weight Percentage
    position_weight_pct DECIMAL(10,4),

    -- 9. Daily Gain/Loss
    daily_gain_loss DECIMAL(15,2),
    daily_gain_loss_pct DECIMAL(10,4),

    -- 10. Commission Cost
    commission_cost DECIMAL(15,2),
    commission_pct DECIMAL(10,4),

    -- 11. Stock Price Change
    stock_price_change DECIMAL(15,4),
    stock_price_change_pct DECIMAL(10,4)
);

CREATE TABLE portfolio_calculations (
    id SERIAL PRIMARY KEY,
    doc_ref_no VARCHAR(100) UNIQUE NOT NULL,  -- ← UNIQUE constraint here!
    ticker VARCHAR(50) NOT NULL,
    source_pdf VARCHAR(255),
    transaction_date DATE,
    transaction_type CHAR(1),
    quantity INTEGER,
    price DECIMAL(12,2),
    total_amount DECIMAL(12,2),
    portfolio_current_value DECIMAL(12,2),
    total_investment DECIMAL(12,2),
    unrealized_gain_loss DECIMAL(12,2),
    unrealized_gain_loss_pct DECIMAL(10,4),
    realized_gain_loss DECIMAL(12,2),
    realized_gain_loss_pct DECIMAL(10,4),
    average_cost_per_share DECIMAL(12,2),
    portfolio_total_return DECIMAL(12,2),
    portfolio_total_return_pct DECIMAL(10,4),
    sector_allocation_pct DECIMAL(10,4),
    position_weight_pct DECIMAL(10,4),
    daily_gain_loss DECIMAL(12,2),
    daily_gain_loss_pct DECIMAL(10,4),
    commission_cost DECIMAL(12,2),
    commission_pct DECIMAL(10,4),
    stock_price_change DECIMAL(12,2),
    stock_price_change_pct DECIMAL(10,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'transactions'
ORDER BY ordinal_position;

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'portfolios'
ORDER BY ordinal_position;

SELECT column_name
FROM information_schema.columns
WHERE table_name='transactions'
ORDER BY ordinal_position;

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'portfolio_docref_pnl_snapshot'
ORDER BY ordinal_position;



SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE column_name ILIKE '%price%'
ORDER BY table_name, column_name;

CREATE TABLE IF NOT EXISTS portfolio_docref_pnl_snapshot (
    id SERIAL PRIMARY KEY,

    -- ownership
    portfolio_id INTEGER NOT NULL,

    -- PDF reference
    doc_ref VARCHAR(50) NOT NULL,
    ticker VARCHAR(20) NOT NULL,

    -- realized gain (doc_ref + ticker level)
    realized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,

    -- portfolio-level totals (snapshot)
    total_realized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,
    total_unrealized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,
    total_pnl NUMERIC(15,4) NOT NULL DEFAULT 0,
    total_pnl_percent NUMERIC(10,4) NOT NULL DEFAULT 0,

    -- snapshot metadata
    snapshot_date DATE NOT NULL,

    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- prevent duplicates
    CONSTRAINT uniq_portfolio_docref_snapshot
      UNIQUE (portfolio_id, snapshot_date, doc_ref, ticker)
);

ALTER TABLE transactions ADD COLUMN doc_ref VARCHAR(50);
CREATE INDEX idx_transactions_doc_ref ON transactions(doc_ref);

CREATE TABLE IF NOT EXISTS portfolio_docref_pnl_snapshot (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER NOT NULL,
  snapshot_date DATE NOT NULL,
  doc_ref VARCHAR(50) NOT NULL,
  ticker VARCHAR(20) NOT NULL,

  realized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,

  total_realized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,
  total_unrealized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,
  total_pnl NUMERIC(15,4) NOT NULL DEFAULT 0,
  total_pnl_percent NUMERIC(15,4) NOT NULL DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (portfolio_id, snapshot_date, doc_ref, ticker)
);

ALTER TABLE portfolio_docref_pnl_snapshot
  ADD COLUMN IF NOT EXISTS cost_basis NUMERIC(15,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS current_price NUMERIC(15,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS market_value NUMERIC(15,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS unrealized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS unrealized_gain_percent NUMERIC(15,4) NOT NULL DEFAULT 0;

CREATE TABLE portfolio_docref_pnl_snapshot (
  id SERIAL PRIMARY KEY,

  portfolio_id INTEGER NOT NULL,
  snapshot_date DATE NOT NULL,
  doc_ref VARCHAR(50) NOT NULL,
  ticker VARCHAR(20) NOT NULL,

  realized_gain NUMERIC(15,4) NOT NULL DEFAULT 0,
  cost_basis NUMERIC(15,4) NOT NULL DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

