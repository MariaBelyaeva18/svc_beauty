module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION get_order_status(p_status TEXT, p_due_date TIMESTAMP WITH TIME ZONE)
    RETURNS TEXT AS $$
BEGIN
    -- Если статус уже 'done', возвращаем его
    IF p_status = 'done' THEN
        RETURN p_status;
    END IF;
    -- Если статус уже 'canceled', возвращаем его
    IF p_status = 'canceled' THEN
        RETURN p_status;
    END IF;

    -- Если текущая дата превышает дату исполнения, возвращаем 'expired'
    IF NOW() > p_due_date THEN
        RETURN 'expired';
    END IF;

    -- В остальных случаях возвращаем переданный статус
    RETURN p_status;
END;
$$ LANGUAGE plpgsql;
    `);
  },
};
