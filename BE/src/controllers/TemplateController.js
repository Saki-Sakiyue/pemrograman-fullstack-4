class TemplateController {
  index(req, res) {
    const templates = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Template ${i + 1}` }));
    res.json({
      message: 'List of templates', data: {
        data: templates,
        meta: { total: templates.length }
      }
    });
  }

  store(req, res) {
    const { name } = req.body;
    res.json({ message: 'Created a new template', data: { name } });
  }

  update(req, res) {
    const { name } = req.body;
    res.json({ message: `Updated template with ID ${req.params.id}`, data: { name } });
  }

  destroy(req, res) {
    res.json({ message: `Delete template with ID ${req.params.id}` });
  }
}

const object = new TemplateController();

module.exports = object;