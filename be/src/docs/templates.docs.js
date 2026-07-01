/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Template management and interactions
 */

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Get all templates with filters and pagination
 *     tags: [Templates]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or description
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: tag_id
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: Filter by tag IDs (multiple)
 *       - in: query
 *         name: stack_id
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: Filter by stack IDs (multiple)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [popular, latest, downloads]
 *           default: latest
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of templates with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     templates:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           thumbnail_url:
 *                             type: string
 *                           download_count:
 *                             type: integer
 *                           upvote_count:
 *                             type: integer
 *                           category:
 *                             type: object
 *                           author:
 *                             type: object
 *                           is_bookmarked:
 *                             type: boolean
 *                           is_upvoted:
 *                             type: boolean
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 */

/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     summary: Get template details by ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Template ID
 *     responses:
 *       200:
 *         description: Template details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     source_url:
 *                       type: string
 *                     demo_url:
 *                       type: string
 *                     download_count:
 *                       type: integer
 *                     upvote_count:
 *                       type: integer
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: object
 *                     stacks:
 *                       type: array
 *                       items:
 *                         type: object
 *                     category:
 *                       type: object
 *                     author:
 *                       type: object
 *                     is_bookmarked:
 *                       type: boolean
 *                     is_upvoted:
 *                       type: boolean
 *       404:
 *         description: Template not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Create new template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: Modern Dashboard Template
 *               description:
 *                 type: string
 *                 example: A beautiful and responsive admin dashboard
 *               category_id:
 *                 type: integer
 *                 example: 5
 *               source_url:
 *                 type: string
 *                 format: uri
 *                 example: https://github.com/user/repo
 *               demo_url:
 *                 type: string
 *                 format: uri
 *                 example: https://demo.example.com
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *                 description: Template images (max 5 files, 5MB each)
 *               tag_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of tag IDs
 *               stack_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of stack IDs
 *     responses:
 *       201:
 *         description: Template created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Template created successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/templates/{id}:
 *   put:
 *     summary: Update template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               source_url:
 *                 type: string
 *               demo_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Template updated successfully
 *       403:
 *         description: Forbidden - not the owner
 *       404:
 *         description: Template not found
 */

/**
 * @swagger
 * /api/templates/{id}:
 *   delete:
 *     summary: Delete template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Template deleted successfully
 *       403:
 *         description: Forbidden - not the owner
 *       404:
 *         description: Template not found
 */

/**
 * @swagger
 * /api/templates/{id}/download:
 *   patch:
 *     summary: Increment download counter
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Download count incremented
 *       404:
 *         description: Template not found
 */

/**
 * @swagger
 * /api/templates/{id}/upvote:
 *   post:
 *     summary: Toggle upvote on template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Upvote toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     is_upvoted:
 *                       type: boolean
 *       404:
 *         description: Template not found
 */

/**
 * @swagger
 * /api/templates/{id}/bookmark:
 *   post:
 *     summary: Toggle bookmark on template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bookmark toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     is_bookmarked:
 *                       type: boolean
 *       404:
 *         description: Template not found
 */
