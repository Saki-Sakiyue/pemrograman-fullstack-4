/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Report inappropriate templates
 */

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Report a template
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - template_id
 *               - reason
 *             properties:
 *               template_id:
 *                 type: integer
 *               reason:
 *                 type: string
 *                 enum: [spam, inappropriate, broken, copyright]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report submitted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
