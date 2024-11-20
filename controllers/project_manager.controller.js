const ProjectManager = require('../models/project_manager.model');

exports.createProjectManager = async (req, res) => {
    try {
        const projectManagerData = {
            ...req.body,
            password: req.body.password,
        };
        const projectManager = await ProjectManager.create(projectManagerData);
        res.status(201).json({ message: 'Project Manager created', data: projectManager });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllProjectManagers = async (req, res) => {
    try {
        const projectManagers = await ProjectManager.findAll();
        res.status(200).json({ data: projectManagers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjectManagerById = async (req, res) => {
    try {
        const projectManager = await ProjectManager.findByPk(req.params.id);
        if (projectManager) {
            res.status(200).json({ data: projectManager });
        } else {
            res.status(404).json({ message: 'Project Manager not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProjectManager = async (req, res) => {
    try {
        const [updated] = await ProjectManager.update(req.body, {
            where: { pm_id: req.params.id },
        });
        if (updated) {
            const updatedManager = await ProjectManager.findByPk(req.params.id);
            res.status(200).json({ message: 'Project Manager updated', data: updatedManager });
        } else {
            res.status(404).json({ message: 'Project Manager not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProjectManager = async (req, res) => {
    try {
        const deleted = await ProjectManager.destroy({
            where: { pm_id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Project Manager deleted' });
        } else {
            res.status(404).json({ message: 'Project Manager not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjectManagersByName = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    try {
        const projectManagers = await ProjectManager.findAll({ where: { name } });
        if (projectManagers.length === 0) {
            return res.status(404).json({ message: 'No Project Managers found with this name' });
        }
        res.status(200).json({ data: projectManagers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjectManagersByProjectName = async (req, res) => {
    const { project_name } = req.query;
    if (!project_name) {
        return res.status(400).json({ error: 'Project name is required' });
    }
    try {
        const projectManagers = await ProjectManager.findAll({ where: { project_name } });
        if (projectManagers.length === 0) {
            return res.status(404).json({ message: 'No Project Managers found with this project name' });
        }
        res.status(200).json({ data: projectManagers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
