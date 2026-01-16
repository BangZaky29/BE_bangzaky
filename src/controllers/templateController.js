const db = require('../config/database');

// GET all templates with features and tech stack
const getAllTemplates = async (req, res, next) => {
  try {
    const { category, type, style } = req.query;
    
    let query = 'SELECT * FROM templates WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    if (style) {
      query += ' AND style = ?';
      params.push(style);
    }

    query += ' ORDER BY created_at DESC';

    const [templates] = await db.query(query, params);

    // Get features and tech stack for each template
    for (let template of templates) {
      const [features] = await db.query(
        'SELECT feature_name FROM template_features WHERE template_id = ?',
        [template.id]
      );
      
      const [techStack] = await db.query(
        'SELECT tech_name FROM template_tech_stack WHERE template_id = ?',
        [template.id]
      );

      template.features = features.map(f => f.feature_name);
      template.tech_stack = techStack.map(t => t.tech_name);
    }

    res.status(200).json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (error) {
    next(error);
  }
};

// GET single template by ID
const getTemplateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [templates] = await db.query('SELECT * FROM templates WHERE id = ?', [id]);

    if (templates.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Template not found' }
      });
    }

    const template = templates[0];

    // Get features
    const [features] = await db.query(
      'SELECT feature_name FROM template_features WHERE template_id = ?',
      [id]
    );

    // Get tech stack
    const [techStack] = await db.query(
      'SELECT tech_name FROM template_tech_stack WHERE template_id = ?',
      [id]
    );

    template.features = features.map(f => f.feature_name);
    template.tech_stack = techStack.map(t => t.tech_name);

    res.status(200).json({
      success: true,
      data: template
    });
  } catch (error) {
    next(error);
  }
};

// POST create new template
const createTemplate = async (req, res, next) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { title, description, price, category, type, style, image_url, features, tech_stack } = req.body;

    // Validate required fields
    if (!title || !description || !price || !category || !type || !style || !image_url) {
      return res.status(400).json({
        success: false,
        error: { message: 'Missing required fields' }
      });
    }

    // Insert template
    const [result] = await connection.query(
      'INSERT INTO templates (title, description, price, category, type, style, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, price, category, type, style, image_url]
    );

    const templateId = result.insertId;

    // Insert features
    if (features && Array.isArray(features)) {
      for (let feature of features) {
        await connection.query(
          'INSERT INTO template_features (template_id, feature_name) VALUES (?, ?)',
          [templateId, feature]
        );
      }
    }

    // Insert tech stack
    if (tech_stack && Array.isArray(tech_stack)) {
      for (let tech of tech_stack) {
        await connection.query(
          'INSERT INTO template_tech_stack (template_id, tech_name) VALUES (?, ?)',
          [templateId, tech]
        );
      }
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      data: { id: templateId }
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// PUT update template
const updateTemplate = async (req, res, next) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { id } = req.params;
    const { title, description, price, category, type, style, image_url, features, tech_stack } = req.body;

    // Check if template exists
    const [existing] = await connection.query('SELECT id FROM templates WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Template not found' }
      });
    }

    // Update template
    const [result] = await connection.query(
      'UPDATE templates SET title = ?, description = ?, price = ?, category = ?, type = ?, style = ?, image_url = ? WHERE id = ?',
      [title, description, price, category, type, style, image_url, id]
    );

    // Update features if provided
    if (features && Array.isArray(features)) {
      await connection.query('DELETE FROM template_features WHERE template_id = ?', [id]);
      for (let feature of features) {
        await connection.query(
          'INSERT INTO template_features (template_id, feature_name) VALUES (?, ?)',
          [id, feature]
        );
      }
    }

    // Update tech stack if provided
    if (tech_stack && Array.isArray(tech_stack)) {
      await connection.query('DELETE FROM template_tech_stack WHERE template_id = ?', [id]);
      for (let tech of tech_stack) {
        await connection.query(
          'INSERT INTO template_tech_stack (template_id, tech_name) VALUES (?, ?)',
          [id, tech]
        );
      }
    }

    await connection.commit();

    res.status(200).json({
      success: true,
      message: 'Template updated successfully'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// DELETE template
const deleteTemplate = async (req, res, next) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { id } = req.params;

    // Check if template exists
    const [existing] = await connection.query('SELECT id FROM templates WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Template not found' }
      });
    }

    // Delete related data
    await connection.query('DELETE FROM template_features WHERE template_id = ?', [id]);
    await connection.query('DELETE FROM template_tech_stack WHERE template_id = ?', [id]);
    await connection.query('DELETE FROM purchases WHERE template_id = ?', [id]);
    
    // Delete template
    await connection.query('DELETE FROM templates WHERE id = ?', [id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

module.exports = {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate
};