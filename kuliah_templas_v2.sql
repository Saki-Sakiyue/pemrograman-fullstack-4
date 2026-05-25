-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 25, 2026 at 07:23 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kuliah_templas`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `template_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `user_id`, `template_id`, `created_at`) VALUES
(1, 2, 1, '2026-04-11 08:48:01'),
(2, 2, 3, '2026-04-11 08:48:01'),
(3, 3, 2, '2026-04-11 08:48:01'),
(4, 4, 5, '2026-04-11 08:48:01'),
(5, 5, 1, '2026-04-11 08:48:01');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Admin Dashboard', 'admin-dashboard'),
(2, 'Landing Page', 'landing-page'),
(3, 'E-Commerce', 'e-commerce'),
(4, 'Portfolio', 'portfolio'),
(5, 'UI Kit', 'ui-kit'),
(6, 'Blog Template', 'blog-template');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int NOT NULL,
  `template_id` int NOT NULL,
  `user_id` int NOT NULL,
  `reason` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('pending','resolved','rejected') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `template_id`, `user_id`, `reason`, `status`, `created_at`, `deleted_at`) VALUES
(1, 2, 2, 'Demo link is no longer accessible.', 'pending', '2026-04-11 08:48:05', NULL),
(2, 4, 3, 'ZIP template file corrupted after download.', 'resolved', '2026-04-11 08:48:05', NULL),
(3, 6, 5, 'Preview images are broken.', 'pending', '2026-04-11 08:48:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stacks`
--

CREATE TABLE `stacks` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `icon_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stacks`
--

INSERT INTO `stacks` (`id`, `name`, `icon_url`) VALUES
(1, 'React', 'https://cdn.simpleicons.org/react/61DAFB'),
(2, 'Next.js', 'https://cdn.simpleicons.org/nextdotjs/000000'),
(3, 'Tailwind CSS', 'https://cdn.simpleicons.org/tailwindcss/06B6D4'),
(4, 'Express.js', 'https://cdn.simpleicons.org/express/000000'),
(5, 'Figma', 'https://cdn.simpleicons.org/figma/F24E1E'),
(6, 'Vue.js', 'https://cdn.simpleicons.org/vue.js/4FC08D'),
(7, 'Laravel', 'https://cdn.simpleicons.org/laravel/FF2D20'),
(8, 'Bootstrap', 'https://cdn.simpleicons.org/bootstrap/7952B3');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `slug`) VALUES
(1, 'Responsive', 'responsive'),
(2, 'Dark Mode', 'dark-mode'),
(3, 'Minimalist', 'minimalist'),
(4, 'Modern', 'modern'),
(5, 'Clean UI', 'clean-ui'),
(6, 'Mobile First', 'mobile-first'),
(7, 'SEO Friendly', 'seo-friendly'),
(8, 'Animated', 'animated');

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `upload_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source_identifier` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `source_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `demo_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `download_url` text COLLATE utf8mb4_general_ci,
  `download_count` int DEFAULT '0',
  `popularity_score` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `user_id`, `category_id`, `title`, `description`, `upload_type`, `source_identifier`, `source_url`, `demo_url`, `download_url`, `download_count`, `popularity_score`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 1, 'Sneat Admin Dashboard', 'Modern admin dashboard template built with Bootstrap 5.', 'link', 'base-sneat', 'https://github.com/themeselection/sneat-bootstrap-html-admin-template-free', 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/', NULL, 150, 450, 1, '2026-04-11 08:47:50', '2026-05-20 04:09:50', NULL),
(2, 3, 2, 'Tailwind SaaS Landing', 'Landing page template for SaaS startup with dark mode support.', 'zip', 'base-tailwind', 'uploads/templates/tailwind-saas.zip', 'https://tailwindui.com/', NULL, 85, 200, 1, '2026-04-11 08:47:50', '2026-05-20 04:09:53', NULL),
(3, 4, 4, 'Developer Portfolio', 'Clean developer portfolio template using React and Tailwind CSS.', 'link', 'base-devop', 'https://github.com/cruip/open-react-template', 'https://open.cruip.com/', NULL, 120, 300, 1, '2026-04-11 08:47:50', '2026-05-20 04:09:58', NULL),
(4, 5, 3, 'Modern E-Commerce UI', 'Responsive e-commerce frontend UI kit with modern design.', 'zip', 'base-ecom', 'uploads/templates/ecommerce-ui.zip', 'https://commercejs.com/demo/', NULL, 95, 260, 1, '2026-04-11 08:47:50', '2026-05-20 04:10:00', NULL),
(5, 3, 5, 'Figma Mobile UI Kit', 'Professional mobile app UI kit for Figma.', 'link', 'base-figma', 'https://www.figma.com/community', 'https://www.figma.com/community', NULL, 210, 520, 1, '2026-04-11 08:47:50', '2026-05-20 04:10:03', NULL),
(6, 2, 6, 'Minimal Blog Template', 'Minimalist blog template optimized for SEO and readability.', 'link', 'base-blog', 'https://github.com/tailwindtoolbox/Minimal-Blog', 'https://tailwindtoolbox.github.io/Minimal-Blog/', NULL, 70, 140, 1, '2026-04-11 08:47:50', '2026-05-20 04:10:06', NULL),
(7, 2, NULL, 'Paradigm Shift', NULL, 'link', 'html5up.net-paradigm-shift', 'https://html5up.net/', 'https://html5up.net/paradigm-shift', 'https://html5up.net/paradigm-shift/download', 498055, 498055, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(8, 2, NULL, 'Massively', NULL, 'link', 'html5up.net-massively', 'https://html5up.net/', 'https://html5up.net/massively', 'https://html5up.net/massively/download', 672641, 672641, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(9, 2, NULL, 'Ethereal', NULL, 'link', 'html5up.net-ethereal', 'https://html5up.net/', 'https://html5up.net/ethereal', 'https://html5up.net/ethereal/download', 424776, 424776, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(10, 2, NULL, 'Story', NULL, 'link', 'html5up.net-story', 'https://html5up.net/', 'https://html5up.net/story', 'https://html5up.net/story/download', 414686, 414686, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(11, 2, NULL, 'Dimension', NULL, 'link', 'html5up.net-dimension', 'https://html5up.net/', 'https://html5up.net/dimension', 'https://html5up.net/dimension/download', 643186, 643186, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(12, 2, NULL, 'Editorial', NULL, 'link', 'html5up.net-editorial', 'https://html5up.net/', 'https://html5up.net/editorial', 'https://html5up.net/editorial/download', 524831, 524831, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(13, 2, NULL, 'Forty', NULL, 'link', 'html5up.net-forty', 'https://html5up.net/', 'https://html5up.net/forty', 'https://html5up.net/forty/download', 441376, 441376, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(14, 2, NULL, 'Stellar', NULL, 'link', 'html5up.net-stellar', 'https://html5up.net/', 'https://html5up.net/stellar', 'https://html5up.net/stellar/download', 400515, 400515, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(15, 2, NULL, 'Multiverse', NULL, 'link', 'html5up.net-multiverse', 'https://html5up.net/', 'https://html5up.net/multiverse', 'https://html5up.net/multiverse/download', 385074, 385074, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(16, 2, NULL, 'Phantom', NULL, 'link', 'html5up.net-phantom', 'https://html5up.net/', 'https://html5up.net/phantom', 'https://html5up.net/phantom/download', 448401, 448401, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(17, 2, NULL, 'Hyperspace', NULL, 'link', 'html5up.net-hyperspace', 'https://html5up.net/', 'https://html5up.net/hyperspace', 'https://html5up.net/hyperspace/download', 524101, 524101, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(18, 2, NULL, 'Future Imperfect', NULL, 'link', 'html5up.net-future-imperfect', 'https://html5up.net/', 'https://html5up.net/future-imperfect', 'https://html5up.net/future-imperfect/download', 417302, 417302, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(19, 2, NULL, 'Solid State', NULL, 'link', 'html5up.net-solid-state', 'https://html5up.net/', 'https://html5up.net/solid-state', 'https://html5up.net/solid-state/download', 471226, 471226, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(20, 2, NULL, 'Lens', NULL, 'link', 'html5up.net-lens', 'https://html5up.net/', 'https://html5up.net/lens', 'https://html5up.net/lens/download', 395009, 395009, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(21, 2, NULL, 'Fractal', NULL, 'link', 'html5up.net-fractal', 'https://html5up.net/', 'https://html5up.net/fractal', 'https://html5up.net/fractal/download', 303624, 303624, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(22, 2, NULL, 'Eventually', NULL, 'link', 'html5up.net-eventually', 'https://html5up.net/', 'https://html5up.net/eventually', 'https://html5up.net/eventually/download', 369416, 369416, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(23, 2, NULL, 'Spectral', NULL, 'link', 'html5up.net-spectral', 'https://html5up.net/', 'https://html5up.net/spectral', 'https://html5up.net/spectral/download', 524395, 524395, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(24, 2, NULL, 'Photon', NULL, 'link', 'html5up.net-photon', 'https://html5up.net/', 'https://html5up.net/photon', 'https://html5up.net/photon/download', 313277, 313277, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(25, 2, NULL, 'Highlights', NULL, 'link', 'html5up.net-highlights', 'https://html5up.net/', 'https://html5up.net/highlights', 'https://html5up.net/highlights/download', 262061, 262061, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(26, 2, NULL, 'Landed', NULL, 'link', 'html5up.net-landed', 'https://html5up.net/', 'https://html5up.net/landed', 'https://html5up.net/landed/download', 473345, 473345, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(27, 2, NULL, 'Strata', NULL, 'link', 'html5up.net-strata', 'https://html5up.net/', 'https://html5up.net/strata', 'https://html5up.net/strata/download', 391504, 391504, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(28, 2, NULL, 'Read Only', NULL, 'link', 'html5up.net-read-only', 'https://html5up.net/', 'https://html5up.net/read-only', 'https://html5up.net/read-only/download', 276564, 276564, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(29, 2, NULL, 'Alpha', NULL, 'link', 'html5up.net-alpha', 'https://html5up.net/', 'https://html5up.net/alpha', 'https://html5up.net/alpha/download', 387562, 387562, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(30, 2, NULL, 'Directive', NULL, 'link', 'html5up.net-directive', 'https://html5up.net/', 'https://html5up.net/directive', 'https://html5up.net/directive/download', 288445, 288445, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(31, 2, NULL, 'Aerial', NULL, 'link', 'html5up.net-aerial', 'https://html5up.net/', 'https://html5up.net/aerial', 'https://html5up.net/aerial/download', 522819, 522819, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(32, 2, NULL, 'Twenty', NULL, 'link', 'html5up.net-twenty', 'https://html5up.net/', 'https://html5up.net/twenty', 'https://html5up.net/twenty/download', 439227, 439227, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(33, 2, NULL, 'Big Picture', NULL, 'link', 'html5up.net-big-picture', 'https://html5up.net/', 'https://html5up.net/big-picture', 'https://html5up.net/big-picture/download', 611646, 611646, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(34, 2, NULL, 'Tessellate', NULL, 'link', 'html5up.net-tessellate', 'https://html5up.net/', 'https://html5up.net/tessellate', 'https://html5up.net/tessellate/download', 386435, 386435, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(35, 2, NULL, 'Prologue', NULL, 'link', 'html5up.net-prologue', 'https://html5up.net/', 'https://html5up.net/prologue', 'https://html5up.net/prologue/download', 679415, 679415, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(36, 2, NULL, 'Helios', NULL, 'link', 'html5up.net-helios', 'https://html5up.net/', 'https://html5up.net/helios', 'https://html5up.net/helios/download', 568028, 568028, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(37, 2, NULL, 'Telephasic', NULL, 'link', 'html5up.net-telephasic', 'https://html5up.net/', 'https://html5up.net/telephasic', 'https://html5up.net/telephasic/download', 358282, 358282, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(38, 2, NULL, 'Strongly Typed', NULL, 'link', 'html5up.net-strongly-typed', 'https://html5up.net/', 'https://html5up.net/strongly-typed', 'https://html5up.net/strongly-typed/download', 502862, 502862, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(39, 2, NULL, 'Parallelism', NULL, 'link', 'html5up.net-parallelism', 'https://html5up.net/', 'https://html5up.net/parallelism', 'https://html5up.net/parallelism/download', 606192, 606192, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(40, 2, NULL, 'Escape Velocity', NULL, 'link', 'html5up.net-escape-velocity', 'https://html5up.net/', 'https://html5up.net/escape-velocity', 'https://html5up.net/escape-velocity/download', 482731, 482731, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(41, 2, NULL, 'Astral', NULL, 'link', 'html5up.net-astral', 'https://html5up.net/', 'https://html5up.net/astral', 'https://html5up.net/astral/download', 433833, 433833, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(42, 2, NULL, 'Striped', NULL, 'link', 'html5up.net-striped', 'https://html5up.net/', 'https://html5up.net/striped', 'https://html5up.net/striped/download', 393269, 393269, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(43, 2, NULL, 'Dopetrope', NULL, 'link', 'html5up.net-dopetrope', 'https://html5up.net/', 'https://html5up.net/dopetrope', 'https://html5up.net/dopetrope/download', 431232, 431232, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(44, 2, NULL, 'Miniport', NULL, 'link', 'html5up.net-miniport', 'https://html5up.net/', 'https://html5up.net/miniport', 'https://html5up.net/miniport/download', 433100, 433100, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(45, 2, NULL, 'TXT', NULL, 'link', 'html5up.net-txt', 'https://html5up.net/', 'https://html5up.net/txt', 'https://html5up.net/txt/download', 364001, 364001, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(46, 2, NULL, 'Verti', NULL, 'link', 'html5up.net-verti', 'https://html5up.net/', 'https://html5up.net/verti', 'https://html5up.net/verti/download', 414870, 414870, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(47, 2, NULL, 'Zerofour', NULL, 'link', 'html5up.net-zerofour', 'https://html5up.net/', 'https://html5up.net/zerofour', 'https://html5up.net/zerofour/download', 524941, 524941, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(48, 2, NULL, 'Arcana', NULL, 'link', 'html5up.net-arcana', 'https://html5up.net/', 'https://html5up.net/arcana', 'https://html5up.net/arcana/download', 492271, 492271, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(49, 2, NULL, 'Halcyonic', NULL, 'link', 'html5up.net-halcyonic', 'https://html5up.net/', 'https://html5up.net/halcyonic', 'https://html5up.net/halcyonic/download', 393354, 393354, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(50, 2, NULL, 'Minimaxing', NULL, 'link', 'html5up.net-minimaxing', 'https://html5up.net/', 'https://html5up.net/minimaxing', 'https://html5up.net/minimaxing/download', 367097, 367097, 1, '2026-05-20 05:09:03', '2026-05-20 05:09:03', NULL),
(107, 2, 2, 'Alornix Templates', 'Tailwind business website template collection with beautiful layouts for multiple use cases', 'link', 'htmlrev.com-alornix-templates-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://alornix.com/blog/introducing-alornix-templates-18-premium-tailwind-css-themes-for-free', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(108, 2, 2, 'Landing Page', 'Tailwind business website template featuring vivid colors and vector illustrations', 'link', 'htmlrev.com-landing-page-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/landing-page', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(109, 2, 2, 'Startup Template', 'Tailwind startup website template with toned down colors and black accents', 'link', 'htmlrev.com-startup-template-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tomve.gumroad.com/l/startuptemplate', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(110, 2, 2, 'Block', 'Tailwind startup website template featuring modern light theme and essential sections', 'link', 'htmlrev.com-block-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://codescandy.com/template/block-tailwind-css-html-template-free/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(111, 2, 2, 'Landing Startup', 'Tailwind startup website template packing essential elements and sections', 'link', 'htmlrev.com-landing-startup-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/landing-startup', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(112, 2, 2, 'Daiva', 'Tailwind SaaS landing page template generously offering multiple essential sections and pages', 'link', 'htmlrev.com-daiva-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/xikbjm', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(113, 2, 2, 'SendIt', 'Tailwind SaaS landing page template providing well designed essential sections for basic projects', 'link', 'htmlrev.com-sendit-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/ysrmlq', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(114, 2, 2, 'Play', 'Tailwind SaaS landing page template featuring multiple well designed pages with blue highlights', 'link', 'htmlrev.com-play-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/TailGrids/play-tailwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(115, 2, 2, 'SaaSy Dark', 'Tailwind SaaS landing page template with subtle animations and purple accents', 'link', 'htmlrev.com-saasy-dark-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(116, 2, 2, 'Pixa AI', 'Tailwind SaaS landing page template that\'s tastefully designed and coded', 'link', 'htmlrev.com-pixa-ai-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(117, 2, 2, 'Finance SaaS', 'Tailwind SaaS landing page template for basic projects that need launching fast', 'link', 'htmlrev.com-finance-saas-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(118, 2, 2, 'Celestial SaaS', 'Tailwind SaaS landing page template based on light theme and blue highlights', 'link', 'htmlrev.com-celestial-saas-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(119, 2, 2, 'SaaS AI', 'Tailwind SaaS landing page template with essential elements in dark theme', 'link', 'htmlrev.com-saas-ai-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(120, 2, 2, 'SmartAiX SaaS', 'Tailwind SaaS landing page template with purple based business results oriented layout', 'link', 'htmlrev.com-smartaix-saas-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://designtocodes.com/product/smartaix-free-tailwind-css-app-landing-page-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(121, 2, 2, 'BookMe', 'Tailwind SaaS landing page template wrapped in light theme and orange call to actions', 'link', 'htmlrev.com-bookme-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/dyzju', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(122, 2, 2, 'DataAI SaaS', 'Tailwind SaaS landing page template providing extra pages for user sign up', 'link', 'htmlrev.com-dataai-saas-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://designtocodes.com/product/dataai-free-app-landing-page-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(123, 2, 2, 'App Landing Page 2', 'Tailwind SaaS landing page template for good looking basic online projects', 'link', 'htmlrev.com-app-landing-page-2-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/zejzw', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(124, 2, 2, 'SaaS One Page', 'Tailwind SaaS landing page template creatively designed with purple highlights', 'link', 'htmlrev.com-saas-one-page-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/ejxny', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(125, 2, 2, 'SaaS Landing', 'Tailwind SaaS landing page template built on light theme with vivid accents', 'link', 'htmlrev.com-saas-landing-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/saas-landing', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(126, 2, 2, 'Landwind', 'Tailwind SaaS landing template based on clean design and marketing optimized structure', 'link', 'htmlrev.com-landwind-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://themesberg.com/product/tailwind-css/landing-page', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(127, 2, 2, 'Pinwheel', 'Tailwind SaaS landing page template that looks great and is easy to customize', 'link', 'htmlrev.com-pinwheel-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://themefisher.com/products/pinwheel-tailwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(128, 2, 2, 'Screenshot', 'Tailwind SaaS landing page template that\'s ready to use in simple projects', 'link', 'htmlrev.com-screenshot-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/screenshot-landing-page', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(129, 2, 2, 'Skilline', 'Tailwind SaaS landing page template that features a beautifully designed header', 'link', 'htmlrev.com-skilline-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/mhaecal/skilline-landing-page', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(130, 2, 2, 'Landing Software', 'Tailwind SaaS landing page template designed with geometric decorations', 'link', 'htmlrev.com-landing-software-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/landing-software-tailwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(131, 2, 2, 'Marketing Web App', 'Tailwind SaaS landing page template that works well for a simple tech web app', 'link', 'htmlrev.com-marketing-web-app-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/marketing-web-app-tailwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(132, 2, 2, 'Chat origin', 'Tailwind mobile app landing page template with blue calls to action', 'link', 'htmlrev.com-chat-origin-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(133, 2, 2, 'AI Sales app', 'Tailwind mobile app landing page template with sprinkled with bright colors', 'link', 'htmlrev.com-ai-sales-app-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(134, 2, 2, 'Mobile App', 'Tailwind mobile app landing page template with minimalist style and black accents', 'link', 'htmlrev.com-mobile-app-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/lqway', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(135, 2, 2, 'App Landing Page', 'Tailwind mobile app landing page template for basic online presentation', 'link', 'htmlrev.com-app-landing-page-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/app-landing-page', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(136, 2, 2, 'Traveler', 'Tailwind mobile app landing page template with minimal color scheme and subtle animations', 'link', 'htmlrev.com-traveler-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(137, 2, 2, 'Newsletter Landing Page', 'Tailwind newsletter landing page template based on immersive dark mode', 'link', 'htmlrev.com-newsletter-landing-page-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/xuiwgg', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(138, 2, 2, 'Lingare', 'Tailwind physical product landing page template that\'s easy to customize and launch', 'link', 'htmlrev.com-lingare-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/spaly', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(139, 2, 2, 'Nordic Store', 'Tailwind physical product landing page template for selling premium items', 'link', 'htmlrev.com-nordic-store-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/nordic-store', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(140, 2, 2, 'Cravee', 'Tailwind food product landing page template featuring creative fun layout with bright colors', 'link', 'htmlrev.com-cravee-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://templatesjungle.com/downloads/cravee-tailwind/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(141, 2, 2, 'Kubik', 'Tailwind agency website template based on simple light theme with colorful illustrations', 'link', 'htmlrev.com-kubik-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://boxmodel.dev/templates/kubik/html', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(142, 2, 2, 'Agencia', 'Tailwind agency website template featuring bold typography and beautiful light theme', 'link', 'htmlrev.com-agencia-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.themeptation.net/product/agencia-free-creative-landing-page-html5-template-using-tailwind-css', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(143, 2, 2, 'Agency Landing Page', 'Tailwind agency website template based on a pattern background header', 'link', 'htmlrev.com-agency-landing-page-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/wyiolm', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(144, 2, 2, 'Tailone', 'Tailwind digital marketing agency website template based on vector illustrations', 'link', 'htmlrev.com-tailone-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailwindtemplate.net/tailone-tailwind-one-page-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(145, 2, 2, 'Sam Building', 'Tailwind real estate agency website template providing essential building elements', 'link', 'htmlrev.com-sam-building-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://boxmodel.dev/templates/sambuilding/html', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(146, 2, 2, 'Brick property', 'Tailwind real estate agency website template with property filter section', 'link', 'htmlrev.com-brick-property-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(147, 2, 2, 'Bistro restaurant', 'Tailwind restaurant website template that\'s well designed with red accents', 'link', 'htmlrev.com-bistro-restaurant-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(148, 2, 2, 'Nutrio restaurant', 'Tailwind restaurant website template featuring dark theme and location widget', 'link', 'htmlrev.com-nutrio-restaurant-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(149, 2, 2, 'Law Fire', 'Tailwind law firm website template featuring professional and confidence inspiring design', 'link', 'htmlrev.com-law-fire-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(150, 2, 2, 'Law group', 'Tailwind law firm website template featuring classical looking blue and golden colors', 'link', 'htmlrev.com-law-group-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(151, 2, 2, 'Car wash', 'Tailwind car wash website template with useful image slider in the header', 'link', 'htmlrev.com-car-wash-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(152, 2, 2, 'Mercy', 'Tailwind nonprofit website template based on simple light design and illustrations', 'link', 'htmlrev.com-mercy-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://boxmodel.dev/templates/mercy/html', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(153, 2, 2, 'Rainblur Landing Page', 'Tailwind coming soon page template for basic projects in dark mode', 'link', 'htmlrev.com-rainblur-landing-page-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/rainblur-landing-page', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(154, 2, 2, 'Blog Tailwind CSS', 'Tailwind blog template featuring blog list, details and project well designed pages', 'link', 'htmlrev.com-blog-tailwind-css-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/blog-tailwind-css', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(155, 2, 2, 'Tailnews Tailwind Template', 'Tailwind blog template that has essential features for large publications', 'link', 'htmlrev.com-tailnews-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailwindtemplate.net/tailnews-tailwind-news-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(156, 2, 2, 'Ghostwind', 'Tailwind blog template featuring gray backgrounds and multiple pages', 'link', 'htmlrev.com-ghostwind-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/ghostwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(157, 2, 2, 'Blog Two Page', 'Tailwind blog template with modern dark theme and essential elements', 'link', 'htmlrev.com-blog-two-page-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://lbegey78.gumroad.com/l/rdmdc', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(158, 2, 2, 'Amanda', 'Tailwind blog template with essential sections for quick projects', 'link', 'htmlrev.com-amanda-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://templatesjungle.com/downloads/amanda-lifestyle-blog-tailwind-css-website-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(159, 2, 2, 'Neutral Blog', 'Alpine Tailwind blog template that can power individual and commercial publications', 'link', 'htmlrev.com-neutral-blog-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailwindtemplate.net/neutral-tailwind-blog-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(160, 2, 2, 'Atlas', 'Alpine Tailwind blog template featuring a beautiful and minimal design', 'link', 'htmlrev.com-atlas-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://redpixelthemes.com/templates/atlas/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(161, 2, 2, 'Jamie developer', 'Tailwind portfolio template with gray backgrounds and subtle animations', 'link', 'htmlrev.com-jamie-developer-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(162, 2, 2, 'Portfolio Tailwind CSS', 'Tailwind portfolio template with beautiful category illustrations for basic projects', 'link', 'htmlrev.com-portfolio-tailwind-css-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/portfolio-tailwind-css', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(163, 2, 2, 'Ditch', 'Tailwind portfolio template that\'s based on minimal layout and blue accents', 'link', 'htmlrev.com-ditch-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://boxmodel.dev/templates/ditch/html', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(164, 2, 2, 'Porto', 'Tailwind portfolio template with stylish gray backgrounds and dark gray accents', 'link', 'htmlrev.com-porto-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://boxmodel.dev/templates/porto/html', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(165, 2, 2, 'Brutalist', 'Tailwind portfolio template borrowing brutalist design cues and vibrant colors', 'link', 'htmlrev.com-brutalist-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailwindtemplate.net/brutalist-neubrutalism-portfolio-tailwind-css/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(166, 2, 2, 'Atom', 'Alpine Tailwind portfolio template for vibrant passionate creators', 'link', 'htmlrev.com-atom-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://redpixelthemes.com/templates/atom/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(167, 2, 2, 'JrDev Portfolio', 'Tailwind personal website template with yellow accents that works great for developers', 'link', 'htmlrev.com-jrdev-portfolio-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(168, 2, 2, 'Bella Youtube', 'Tailwind personal website template with impressive dark theme and image slider', 'link', 'htmlrev.com-bella-youtube-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://awesome-landingpages.vercel.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(169, 2, 2, 'Profile Card Tailwind Template', 'Tailwind personal website template that\'s super simple to customize and deploy', 'link', 'htmlrev.com-profile-card-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/profile-card', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(170, 2, 2, 'Resume Alternate Tailwind CSS', 'Tailwind resume website template with profile details, timeline and minimal purple accents', 'link', 'htmlrev.com-resume-alternate-tailwind-css-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/resume-alternate-tailwind-css', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(171, 2, 2, 'Resume Tailwind', 'Tailwind resume template for basic online personal presentation pages', 'link', 'htmlrev.com-resume-tailwind-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/resume-tailwind-css', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(172, 2, 2, 'Richard', 'Tailwind resume website template featuring bold title, few sections and red accents', 'link', 'htmlrev.com-richard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://templatesjungle.com/downloads/richard-tailwind/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(173, 2, 2, 'Freshcart', 'Tailwind ecommerce template providing 2 pages with essential elements for online shops', 'link', 'htmlrev.com-freshcart-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://codescandy.com/template/freshcart-free-tailwindcss-ecommerce-html-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(174, 2, 2, 'Refcart', 'Tailwind ecommerce template that\'s well designed and properly structured', 'link', 'htmlrev.com-refcart-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/fajar7xx/ecommerce-template-tailwind-1', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(175, 2, 2, 'TailAdmin', 'Tailwind admin dashboard template featuring gray backgrounds and blue accents', 'link', 'htmlrev.com-tailadmin-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailadmin.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(176, 2, 2, 'Datta Able', 'Tailwind admin dashboard template providing 6 pages, 15 cards and 50 interface widgets', 'link', 'htmlrev.com-datta-able-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://codedthemes.com/item/datta-able-free-tailwind-admin-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(177, 2, 2, 'Spike', 'Tailwind admin dashboard template built using a tech inspired color scheme', 'link', 'htmlrev.com-spike-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.wrappixel.com/templates/spike-free-tailwind-admin-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(178, 2, 2, 'Dash UI', 'Tailwind admin dashboard template with dark sidebar navigation and colorful accents', 'link', 'htmlrev.com-dash-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://codescandy.com/template/free-tailwindcss-admin-dashboard-html-template-dash-ui/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(179, 2, 2, 'Hope UI Tailwind', 'Tailwind admin dashboard template offering many advanced features', 'link', 'htmlrev.com-hope-ui-tailwind-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://hopeui.iqonic.design/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(180, 2, 2, 'SmartAiX Dashboard', 'Tailwind admin dashboard template offering sidebar dropdown navigation items', 'link', 'htmlrev.com-smartaix-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://designtocodes.com/product/smartaix-data-analytics-tailwind-dashboard-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(181, 2, 2, 'DataAI Dashboard', 'Tailwind admin dashboard template with professional look and purple highlights', 'link', 'htmlrev.com-dataai-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://designtocodes.com/product/dataai-data-analytics-tailwind-css-dashboard-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(182, 2, 2, 'Windster', 'Tailwind admin dashboard template that features a minimal design and toned down colors', 'link', 'htmlrev.com-windster-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://themesberg.com/product/tailwind-css/dashboard-windster', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(183, 2, 2, 'Cleopatra', 'Tailwind admin dashboard template based on light theme and green highlights', 'link', 'htmlrev.com-cleopatra-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/moesaid/cleopatra', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(184, 2, 2, 'Admin Template', 'Tailwind admin dashboard template with gray background and dark sidebar', 'link', 'htmlrev.com-admin-template-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/admin-template', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(185, 2, 2, 'Tailwind Admin', 'Tailwind admin dashboard template made for conservatory looking interfaces', 'link', 'htmlrev.com-tailwind-admin-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/tailwindadmin/admin', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(186, 2, 2, 'Admin Template Night', 'Tailwind admin dashboard in complete lights out mode for immersive experience', 'link', 'htmlrev.com-admin-template-night-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/admin-template-night', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(187, 2, 2, 'Admin Template Day', 'Tailwind admin dashboard template with different than usual navigation placement', 'link', 'htmlrev.com-admin-template-day-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwindtoolbox.com/templates/admin-template-day', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(188, 2, 2, 'Ares', 'Tailwind admin dashboard template with an awesome futuristic appearance', 'link', 'htmlrev.com-ares-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/ares', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(189, 2, 2, 'Soft UI Dashboard Tailwind', 'Tailwind admin dashboard template based on gray backgrounds and vivid color highlights', 'link', 'htmlrev.com-soft-ui-dashboard-tailwind-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/creativetimofficial/soft-ui-dashboard-tailwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(190, 2, 2, 'Argon Dashboard 2 Tailwind', 'Tailwind admin dashboard template featuring modern appearance and great icons', 'link', 'htmlrev.com-argon-dashboard-2-tailwind-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/creativetimofficial/argon-dashboard-tailwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(191, 2, 2, 'Admin One', 'Tailwind admin dashboard template wrapped in a more results oriented design', 'link', 'htmlrev.com-admin-one-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://justboil.me/tailwind-admin-templates/free-dashboard/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(192, 2, 2, 'Dark App Dashboard', 'Tailwind admin dashboard template with essential elements in dark mode', 'link', 'htmlrev.com-dark-app-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pixelcave.com/freebies/dark-app-dashboard-tailwind', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(193, 2, 2, 'Taildashboards', 'Alpine Tailwind admin dashboard template collection with multiple versions', 'link', 'htmlrev.com-taildashboards-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://taildashboards.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(194, 2, 2, 'Neutral Dashboard', 'Alpine Tailwind admin dashboard template featuring collapsible sidebar', 'link', 'htmlrev.com-neutral-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailwindtemplate.net/neutral-dashboard-template/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(195, 2, 2, 'K-WD Dashboard', 'Alpine Tailwind admin dashboard template with light theme and blue highlights', 'link', 'htmlrev.com-k-wd-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/Kamona-WD/kwd-dashboard', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(196, 2, 2, 'Tailwind Admin 2', 'Alpine Tailwind admin dashboard template that has a business oriented design', 'link', 'htmlrev.com-tailwind-admin-2-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/davidgrzyb/tailwind-admin-template', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(197, 2, 2, 'Tailwind CSS Alpine JS', 'Alpine Tailwind admin dashboard template with gray backgrounds and dark sidebar', 'link', 'htmlrev.com-tailwind-css-alpine-js-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/VojislavD/TailwindCSS-Alpine.js-Template', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(198, 2, 2, 'Starter Dashboard', 'Alpine Tailwind admin dashboard template built for basic interface projects', 'link', 'htmlrev.com-starter-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/Kamona-WD/starter-dashboard-layout', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(199, 2, 2, 'Windmill Dashboard', 'Alpine Tailwind admin dashboard template that\'s solid foundation for projects', 'link', 'htmlrev.com-windmill-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://windmillui.com/dashboard-html', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(200, 2, 2, 'Flowbite Admin Dashboard', 'Flowbite Tailwind admin dashboard template offering advanced elements', 'link', 'htmlrev.com-flowbite-admin-dashboard-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/themesberg/flowbite-admin-dashboard', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(201, 2, 2, 'Soft UI Flowbite', 'Flowbite Tailwind admin dashboard template that looks good and is well structured', 'link', 'htmlrev.com-soft-ui-flowbite-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.creative-tim.com/product/soft-ui-flowbite', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(202, 2, 2, 'Modernize', 'Preline Tailwind admin dashboard template offering well designed elements', 'link', 'htmlrev.com-modernize-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://adminmart.com/product/modernize-free-tailwind-admin/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(203, 2, 2, 'Dockerz', 'Alpine Tailwind documentation template that\'s easy to customize and deploy', 'link', 'htmlrev.com-dockerz-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://wicked-templates.gumroad.com/l/rdzjw', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(204, 2, 2, 'Kometa UI Kit', 'Tailwind UI kit to speed up deployment time and elevate project design', 'link', 'htmlrev.com-kometa-ui-kit-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://kitwind.io/products/kometa', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(205, 2, 2, 'Notus Tailwind JS', 'Tailwind UI kit packed with advanced elements and including dashboard template', 'link', 'htmlrev.com-notus-tailwind-js-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/creativetimofficial/notus-js', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(206, 2, 2, 'Tailmater', 'Tailwind UI kit based on gray backgrounds, unique layout and purple color accents', 'link', 'htmlrev.com-tailmater-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailwindtemplate.net/tailmater-tailwind-material-3-ui-kit/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(207, 2, 2, 'TW Elements', 'Tailwind UI kit providing 500+ elements with consistent design and advanced functionalities', 'link', 'htmlrev.com-tw-elements-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tw-elements.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(208, 2, 2, 'Tail-kit', 'Tailwind UI kit packed with elements and templates for dashboards and landing pages', 'link', 'htmlrev.com-tail-kit-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.tailwind-kit.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(209, 2, 2, 'Sira', 'Tailwind design system that\'s customizable and accessible used by designers and developers', 'link', 'htmlrev.com-sira-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://sira.riazer.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(210, 2, 2, 'FlyonUI', 'Tailwind component library that\'s great to use as foundation for any website and web app', 'link', 'htmlrev.com-flyonui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://flyonui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(211, 2, 2, 'Flowbite', 'Tailwind component library that\'s beautifully designed and well structured', 'link', 'htmlrev.com-flowbite-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://flowbite.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(212, 2, 2, 'Preline UI', 'Tailwind component library containing prebuilt UI components for interfaces and websites', 'link', 'htmlrev.com-preline-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://preline.co/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(213, 2, 2, 'DaisyUI', 'Tailwind component library that\'s framework agnostic and offers multiple elements', 'link', 'htmlrev.com-daisyui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://daisyui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(214, 2, 2, 'Tailkits UI', 'Tailwind component library offering 30 ready made elements to get your project started', 'link', 'htmlrev.com-tailkits-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailkits.com/ui/free/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(215, 2, 2, 'Basecoat', 'Tailwind component library that\'s lightweight, extendable and works with any framework', 'link', 'htmlrev.com-basecoat-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://basecoatui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(216, 2, 2, 'Tailspark', 'Tailwind component library offering over 350 well crafted elements to speed up your building cycle', 'link', 'htmlrev.com-tailspark-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailspark.co/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(217, 2, 2, 'TailwindFlex', 'Tailwind component library by the community providing an astonishing 1900+ ready made elements', 'link', 'htmlrev.com-tailwindflex-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailwindflex.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL);
INSERT INTO `templates` (`id`, `user_id`, `category_id`, `title`, `description`, `upload_type`, `source_identifier`, `source_url`, `demo_url`, `download_url`, `download_count`, `popularity_score`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(218, 2, 2, 'Float UI', 'Tailwind component library that helps developers get things done faster and better', 'link', 'htmlrev.com-float-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://floatui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(219, 2, 2, 'CSSnippets', 'Tailwind component library featuring a useful collection copy paste web and app elements', 'link', 'htmlrev.com-cssnippets-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://cssnippets.shefali.dev/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(220, 2, 2, 'Sailboat UI', 'Tailwind component library that\'s modern and flexible to simplify building web products', 'link', 'htmlrev.com-sailboat-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://sailboatui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(221, 2, 2, 'Skeleton', 'Tailwind component library with cool design themes for creating adaptive interfaces', 'link', 'htmlrev.com-skeleton-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.skeleton.dev/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(222, 2, 2, 'Tailblocks', 'Tailwind component library featuring numerous blocks that are minimally designed for easy styling', 'link', 'htmlrev.com-tailblocks-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://tailblocks.cc/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(223, 2, 2, 'LaLoka Layouts', 'Tailwind component library providing many well designed layouts and elements for app interfaces', 'link', 'htmlrev.com-laloka-layouts-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://github.com/lalokalabs/tailwindlayout', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(224, 2, 2, 'Pagedone', 'Tailwind component library packed with well designed elements, blocks, sections and pages', 'link', 'htmlrev.com-pagedone-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pagedone.io/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(225, 2, 2, 'Wickedblocks', 'Tailwind component library that provides a generous amount of ready to use blocks', 'link', 'htmlrev.com-wickedblocks-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.wickedblocks.dev/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(226, 2, 2, 'Meraki UI', 'Tailwind component library carefully crafted to enhance the UX of website and app projects', 'link', 'htmlrev.com-meraki-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://merakiui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(227, 2, 2, 'Ripple UI', 'Tailwind component library created to help developers build modern interfaces', 'link', 'htmlrev.com-ripple-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.ripple-ui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(228, 2, 2, 'Kutty', 'Tailwind component library for building web applications with set of reusable elements', 'link', 'htmlrev.com-kutty-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://kutty.netlify.app/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(229, 2, 2, 'Flowrift', 'Tailwind component library providing beautifully designed elements and blocks for interfaces', 'link', 'htmlrev.com-flowrift-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://flowrift.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(230, 2, 2, 'Wind UI', 'Tailwind component library with elements that can be easily copied and pasted in projects', 'link', 'htmlrev.com-wind-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://wind-ui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(231, 2, 2, 'Tailwind Components', 'Tailwind component library powered by the community to help create apps and landings', 'link', 'htmlrev.com-tailwind-components-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.creative-tim.com/twcomponents/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(232, 2, 2, 'Mamba UI', 'Tailwind component library that saves devs time and money when building projects', 'link', 'htmlrev.com-mamba-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://mambaui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(233, 2, 2, 'HyperUI', 'Tailwind component library that accelerates building websites and elevates design', 'link', 'htmlrev.com-hyperui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.hyperui.dev/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(234, 2, 2, 'Material Tailwind', 'Tailwind component library based on Material Design with minimalist and modern style', 'link', 'htmlrev.com-material-tailwind-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.material-tailwind.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(235, 2, 2, 'David UI', 'Tailwind component library featuring more than 300 interface elements to power up your projects', 'link', 'htmlrev.com-david-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.creative-tim.com/david-ui', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(236, 2, 2, 'PrebuiltUI', 'Tailwind component library featuring beautifully crafted and fully customizable interface elements', 'link', 'htmlrev.com-prebuiltui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://prebuiltui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(237, 2, 2, 'Taildrops', 'Tailwind component library featuring polished copy paste elements for inspiration and building', 'link', 'htmlrev.com-taildrops-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://taildrops.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(238, 2, 2, 'Uiverse', 'Tailwind community component library featuring a large collection of various interface elements', 'link', 'htmlrev.com-uiverse-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://uiverse.io/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(239, 2, 2, 'Penguin UI', 'Alpine Tailwind component library for getting your online projects off the ice faster', 'link', 'htmlrev.com-penguin-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://www.penguinui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(240, 2, 2, 'Pines UI', 'Alpine Tailwind component library packed with animations, sliders, tooltips, modals and more', 'link', 'htmlrev.com-pines-ui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://devdojo.com/pines', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(241, 2, 2, 'Pinemix', 'Alpine Tailwind component library with fully responsive and accessible UI elements', 'link', 'htmlrev.com-pinemix-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://pinemix.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL),
(242, 2, 2, 'SyntaxUI', 'Motion Tailwind component library packed with ready made animated UI elements', 'link', 'htmlrev.com-syntaxui-tailwind-template.jpg', 'https://htmlrev.com/free-tailwind-templates.html', 'https://syntaxui.com/', NULL, 0, 0, 1, '2026-05-20 07:46:51', '2026-05-20 07:46:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `template_images`
--

CREATE TABLE `template_images` (
  `id` int NOT NULL,
  `template_id` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `is_primary` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `template_images`
--

INSERT INTO `template_images` (`id`, `template_id`, `image_url`, `is_primary`) VALUES
(1, 1, 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000', 1),
(2, 1, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000', 0),
(3, 2, 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000', 1),
(4, 2, 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000', 0),
(5, 3, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000', 1),
(6, 3, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000', 0),
(7, 4, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000', 1),
(8, 4, 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000', 0),
(9, 5, 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1000', 1),
(10, 5, 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000', 0),
(11, 6, 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000', 1),
(12, 6, 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000', 0),
(13, 7, 'https://html5up.net/uploads/images/paradigm-shift.jpg', 1),
(14, 8, 'https://html5up.net/uploads/images/massively.jpg', 1),
(15, 9, 'https://html5up.net/uploads/images/ethereal.jpg', 1),
(16, 10, 'https://html5up.net/uploads/images/story.jpg', 1),
(17, 11, 'https://html5up.net/uploads/images/dimension.jpg', 1),
(18, 12, 'https://html5up.net/uploads/images/editorial.jpg', 1),
(19, 13, 'https://html5up.net/uploads/images/forty.jpg', 1),
(20, 14, 'https://html5up.net/uploads/images/stellar.jpg', 1),
(21, 15, 'https://html5up.net/uploads/images/multiverse.jpg', 1),
(22, 16, 'https://html5up.net/uploads/images/phantom.jpg', 1),
(23, 17, 'https://html5up.net/uploads/images/hyperspace.jpg', 1),
(24, 18, 'https://html5up.net/uploads/images/future-imperfect.jpg', 1),
(25, 19, 'https://html5up.net/uploads/images/solid-state.jpg', 1),
(26, 20, 'https://html5up.net/uploads/images/lens.jpg', 1),
(27, 21, 'https://html5up.net/uploads/images/fractal.jpg', 1),
(28, 22, 'https://html5up.net/uploads/images/eventually.jpg', 1),
(29, 23, 'https://html5up.net/uploads/images/spectral.jpg', 1),
(30, 24, 'https://html5up.net/uploads/images/photon.jpg', 1),
(31, 25, 'https://html5up.net/uploads/images/highlights.jpg', 1),
(32, 26, 'https://html5up.net/uploads/images/landed.jpg', 1),
(33, 27, 'https://html5up.net/uploads/images/strata.jpg', 1),
(34, 28, 'https://html5up.net/uploads/images/read-only.jpg', 1),
(35, 29, 'https://html5up.net/uploads/images/alpha.jpg', 1),
(36, 30, 'https://html5up.net/uploads/images/directive.jpg', 1),
(37, 31, 'https://html5up.net/uploads/images/aerial.jpg', 1),
(38, 32, 'https://html5up.net/uploads/images/twenty.jpg', 1),
(39, 33, 'https://html5up.net/uploads/images/big-picture.jpg', 1),
(40, 34, 'https://html5up.net/uploads/images/tessellate.jpg', 1),
(41, 35, 'https://html5up.net/uploads/images/prologue.jpg', 1),
(42, 36, 'https://html5up.net/uploads/images/helios.jpg', 1),
(43, 37, 'https://html5up.net/uploads/images/telephasic.jpg', 1),
(44, 38, 'https://html5up.net/uploads/images/strongly-typed.jpg', 1),
(45, 39, 'https://html5up.net/uploads/images/parallelism.jpg', 1),
(46, 40, 'https://html5up.net/uploads/images/escape-velocity.jpg', 1),
(47, 41, 'https://html5up.net/uploads/images/astral.jpg', 1),
(48, 42, 'https://html5up.net/uploads/images/striped.jpg', 1),
(49, 43, 'https://html5up.net/uploads/images/dopetrope.jpg', 1),
(50, 44, 'https://html5up.net/uploads/images/miniport.jpg', 1),
(51, 45, 'https://html5up.net/uploads/images/txt.jpg', 1),
(52, 46, 'https://html5up.net/uploads/images/verti.jpg', 1),
(53, 47, 'https://html5up.net/uploads/images/zerofour.jpg', 1),
(54, 48, 'https://html5up.net/uploads/images/arcana.jpg', 1),
(55, 49, 'https://html5up.net/uploads/images/halcyonic.jpg', 1),
(56, 50, 'https://html5up.net/uploads/images/minimaxing.jpg', 1),
(57, 107, 'https://htmlrev.com/images/alornix-templates-tailwind-template.jpg', 1),
(58, 108, 'https://htmlrev.com/images/landing-page-tailwind-template.jpg', 1),
(59, 109, 'https://htmlrev.com/images/startup-template-tailwind-template.jpg', 1),
(60, 110, 'https://htmlrev.com/images/block-tailwind-template.jpg', 1),
(61, 111, 'https://htmlrev.com/images/landing-startup-tailwind-template.jpg', 1),
(62, 112, 'https://htmlrev.com/images/daiva-tailwind-template.jpg', 1),
(63, 113, 'https://htmlrev.com/images/sendit-tailwind-template.jpg', 1),
(64, 114, 'https://htmlrev.com/images/play-tailwind-template.jpg', 1),
(65, 115, 'https://htmlrev.com/images/saasy-dark-tailwind-template.jpg', 1),
(66, 116, 'https://htmlrev.com/images/pixa-ai-tailwind-template.jpg', 1),
(67, 117, 'https://htmlrev.com/images/finance-saas-tailwind-template.jpg', 1),
(68, 118, 'https://htmlrev.com/images/celestial-saas-tailwind-template.jpg', 1),
(69, 119, 'https://htmlrev.com/images/saas-ai-tailwind-template.jpg', 1),
(70, 120, 'https://htmlrev.com/images/smartaix-saas-tailwind-template.jpg', 1),
(71, 121, 'https://htmlrev.com/images/bookme-tailwind-template.jpg', 1),
(72, 122, 'https://htmlrev.com/images/dataai-saas-tailwind-template.jpg', 1),
(73, 123, 'https://htmlrev.com/images/app-landing-page-2-tailwind-template.jpg', 1),
(74, 124, 'https://htmlrev.com/images/saas-one-page-tailwind-template.jpg', 1),
(75, 125, 'https://htmlrev.com/images/saas-landing-tailwind-template.jpg', 1),
(76, 126, 'https://htmlrev.com/images/landwind-tailwind-template.jpg', 1),
(77, 127, 'https://htmlrev.com/images/pinwheel-tailwind-template.jpg', 1),
(78, 128, 'https://htmlrev.com/images/screenshot-tailwind-template.jpg', 1),
(79, 129, 'https://htmlrev.com/images/skilline-tailwind-template.jpg', 1),
(80, 130, 'https://htmlrev.com/images/landing-software-tailwind-template.jpg', 1),
(81, 131, 'https://htmlrev.com/images/marketing-web-app-tailwind-template.jpg', 1),
(82, 132, 'https://htmlrev.com/images/chat-origin-tailwind-template.jpg', 1),
(83, 133, 'https://htmlrev.com/images/ai-sales-app-tailwind-template.jpg', 1),
(84, 134, 'https://htmlrev.com/images/mobile-app-tailwind-template.jpg', 1),
(85, 135, 'https://htmlrev.com/images/app-landing-page-tailwind-template.jpg', 1),
(86, 136, 'https://htmlrev.com/images/traveler-tailwind-template.jpg', 1),
(87, 137, 'https://htmlrev.com/images/newsletter-landing-page-tailwind-template.jpg', 1),
(88, 138, 'https://htmlrev.com/images/lingare-tailwind-template.jpg', 1),
(89, 139, 'https://htmlrev.com/images/nordic-store-tailwind-template.jpg', 1),
(90, 140, 'https://htmlrev.com/images/cravee-tailwind-template.jpg', 1),
(91, 141, 'https://htmlrev.com/images/kubik-tailwind-template.jpg', 1),
(92, 142, 'https://htmlrev.com/images/agencia-tailwind-template.jpg', 1),
(93, 143, 'https://htmlrev.com/images/agency-landing-page-tailwind-template.jpg', 1),
(94, 144, 'https://htmlrev.com/images/tailone-tailwind-template.jpg', 1),
(95, 145, 'https://htmlrev.com/images/sam-building-tailwind-template.jpg', 1),
(96, 146, 'https://htmlrev.com/images/brick-property-tailwind-template.jpg', 1),
(97, 147, 'https://htmlrev.com/images/bistro-restaurant-tailwind-template.jpg', 1),
(98, 148, 'https://htmlrev.com/images/nutrio-restaurant-tailwind-template.jpg', 1),
(99, 149, 'https://htmlrev.com/images/law-fire-tailwind-template.jpg', 1),
(100, 150, 'https://htmlrev.com/images/law-group-tailwind-template.jpg', 1),
(101, 151, 'https://htmlrev.com/images/car-wash-tailwind-template.jpg', 1),
(102, 152, 'https://htmlrev.com/images/mercy-tailwind-template.jpg', 1),
(103, 153, 'https://htmlrev.com/images/rainblur-landing-page-tailwind-template.jpg', 1),
(104, 154, 'https://htmlrev.com/images/blog-tailwind-css-tailwind-template.jpg', 1),
(105, 155, 'https://htmlrev.com/images/tailnews-tailwind-template.jpg', 1),
(106, 156, 'https://htmlrev.com/images/ghostwind-tailwind-template.jpg', 1),
(107, 157, 'https://htmlrev.com/images/blog-two-page-tailwind-template.jpg', 1),
(108, 158, 'https://htmlrev.com/images/amanda-tailwind-template.jpg', 1),
(109, 159, 'https://htmlrev.com/images/neutral-blog-tailwind-template.jpg', 1),
(110, 160, 'https://htmlrev.com/images/atlas-tailwind-template.jpg', 1),
(111, 161, 'https://htmlrev.com/images/jamie-developer-tailwind-template.jpg', 1),
(112, 162, 'https://htmlrev.com/images/portfolio-tailwind-css-tailwind-template.jpg', 1),
(113, 163, 'https://htmlrev.com/images/ditch-tailwind-template.jpg', 1),
(114, 164, 'https://htmlrev.com/images/porto-tailwind-template.jpg', 1),
(115, 165, 'https://htmlrev.com/images/brutalist-tailwind-template.jpg', 1),
(116, 166, 'https://htmlrev.com/images/atom-tailwind-template.jpg', 1),
(117, 167, 'https://htmlrev.com/images/jrdev-portfolio-tailwind-template.jpg', 1),
(118, 168, 'https://htmlrev.com/images/bella-youtube-tailwind-template.jpg', 1),
(119, 169, 'https://htmlrev.com/images/profile-card-tailwind-template.jpg', 1),
(120, 170, 'https://htmlrev.com/images/resume-alternate-tailwind-css-tailwind-template.jpg', 1),
(121, 171, 'https://htmlrev.com/images/resume-tailwind-tailwind-template.jpg', 1),
(122, 172, 'https://htmlrev.com/images/richard-tailwind-template.jpg', 1),
(123, 173, 'https://htmlrev.com/images/freshcart-tailwind-template.jpg', 1),
(124, 174, 'https://htmlrev.com/images/refcart-tailwind-template.jpg', 1),
(125, 175, 'https://htmlrev.com/images/tailadmin-tailwind-template.jpg', 1),
(126, 176, 'https://htmlrev.com/images/datta-able-tailwind-template.jpg', 1),
(127, 177, 'https://htmlrev.com/images/spike-tailwind-template.jpg', 1),
(128, 178, 'https://htmlrev.com/images/dash-ui-tailwind-template.jpg', 1),
(129, 179, 'https://htmlrev.com/images/hope-ui-tailwind-tailwind-template.jpg', 1),
(130, 180, 'https://htmlrev.com/images/smartaix-dashboard-tailwind-template.jpg', 1),
(131, 181, 'https://htmlrev.com/images/dataai-dashboard-tailwind-template.jpg', 1),
(132, 182, 'https://htmlrev.com/images/windster-tailwind-template.jpg', 1),
(133, 183, 'https://htmlrev.com/images/cleopatra-tailwind-template.jpg', 1),
(134, 184, 'https://htmlrev.com/images/admin-template-tailwind-template.jpg', 1),
(135, 185, 'https://htmlrev.com/images/tailwind-admin-tailwind-template.jpg', 1),
(136, 186, 'https://htmlrev.com/images/admin-template-night-tailwind-template.jpg', 1),
(137, 187, 'https://htmlrev.com/images/admin-template-day-tailwind-template.jpg', 1),
(138, 188, 'https://htmlrev.com/images/ares-tailwind-template.jpg', 1),
(139, 189, 'https://htmlrev.com/images/soft-ui-dashboard-tailwind-tailwind-template.jpg', 1),
(140, 190, 'https://htmlrev.com/images/argon-dashboard-2-tailwind-tailwind-template.jpg', 1),
(141, 191, 'https://htmlrev.com/images/admin-one-tailwind-template.jpg', 1),
(142, 192, 'https://htmlrev.com/images/dark-app-dashboard-tailwind-template.jpg', 1),
(143, 193, 'https://htmlrev.com/images/taildashboards-tailwind-template.jpg', 1),
(144, 194, 'https://htmlrev.com/images/neutral-dashboard-tailwind-template.jpg', 1),
(145, 195, 'https://htmlrev.com/images/k-wd-dashboard-tailwind-template.jpg', 1),
(146, 196, 'https://htmlrev.com/images/tailwind-admin-2-tailwind-template.jpg', 1),
(147, 197, 'https://htmlrev.com/images/tailwind-css-alpine-js-tailwind-template.jpg', 1),
(148, 198, 'https://htmlrev.com/images/starter-dashboard-tailwind-template.jpg', 1),
(149, 199, 'https://htmlrev.com/images/windmill-dashboard-tailwind-template.jpg', 1),
(150, 200, 'https://htmlrev.com/images/flowbite-admin-dashboard-tailwind-template.jpg', 1),
(151, 201, 'https://htmlrev.com/images/soft-ui-flowbite-tailwind-template.jpg', 1),
(152, 202, 'https://htmlrev.com/images/modernize-tailwind-template.jpg', 1),
(153, 203, 'https://htmlrev.com/images/dockerz-tailwind-template.jpg', 1),
(154, 204, 'https://htmlrev.com/images/kometa-ui-kit-tailwind-template.jpg', 1),
(155, 205, 'https://htmlrev.com/images/notus-tailwind-js-tailwind-template.jpg', 1),
(156, 206, 'https://htmlrev.com/images/tailmater-tailwind-template.jpg', 1),
(157, 207, 'https://htmlrev.com/images/tw-elements-tailwind-template.jpg', 1),
(158, 208, 'https://htmlrev.com/images/tail-kit-tailwind-template.jpg', 1),
(159, 209, 'https://htmlrev.com/images/sira-tailwind-template.jpg', 1),
(160, 210, 'https://htmlrev.com/images/flyonui-tailwind-template.jpg', 1),
(161, 211, 'https://htmlrev.com/images/flowbite-tailwind-template.jpg', 1),
(162, 212, 'https://htmlrev.com/images/preline-ui-tailwind-template.jpg', 1),
(163, 213, 'https://htmlrev.com/images/daisyui-tailwind-template.jpg', 1),
(164, 214, 'https://htmlrev.com/images/tailkits-ui-tailwind-template.jpg', 1),
(165, 215, 'https://htmlrev.com/images/basecoat-tailwind-template.jpg', 1),
(166, 216, 'https://htmlrev.com/images/tailspark-tailwind-template.jpg', 1),
(167, 217, 'https://htmlrev.com/images/tailwindflex-tailwind-template.jpg', 1),
(168, 218, 'https://htmlrev.com/images/float-ui-tailwind-template.jpg', 1),
(169, 219, 'https://htmlrev.com/images/cssnippets-tailwind-template.jpg', 1),
(170, 220, 'https://htmlrev.com/images/sailboat-ui-tailwind-template.jpg', 1),
(171, 221, 'https://htmlrev.com/images/skeleton-tailwind-template.jpg', 1),
(172, 222, 'https://htmlrev.com/images/tailblocks-tailwind-template.jpg', 1),
(173, 223, 'https://htmlrev.com/images/laloka-layouts-tailwind-template.jpg', 1),
(174, 224, 'https://htmlrev.com/images/pagedone-tailwind-template.jpg', 1),
(175, 225, 'https://htmlrev.com/images/wickedblocks-tailwind-template.jpg', 1),
(176, 226, 'https://htmlrev.com/images/meraki-ui-tailwind-template.jpg', 1),
(177, 227, 'https://htmlrev.com/images/ripple-ui-tailwind-template.jpg', 1),
(178, 228, 'https://htmlrev.com/images/kutty-tailwind-template.jpg', 1),
(179, 229, 'https://htmlrev.com/images/flowrift-tailwind-template.jpg', 1),
(180, 230, 'https://htmlrev.com/images/wind-ui-tailwind-template.jpg', 1),
(181, 231, 'https://htmlrev.com/images/tailwind-components-tailwind-template.jpg', 1),
(182, 232, 'https://htmlrev.com/images/mamba-ui-tailwind-template.jpg', 1),
(183, 233, 'https://htmlrev.com/images/hyperui-tailwind-template.jpg', 1),
(184, 234, 'https://htmlrev.com/images/material-tailwind-tailwind-template.jpg', 1),
(185, 235, 'https://htmlrev.com/images/david-ui-tailwind-template.jpg', 1),
(186, 236, 'https://htmlrev.com/images/prebuiltui-tailwind-template.jpg', 1),
(187, 237, 'https://htmlrev.com/images/taildrops-tailwind-template.jpg', 1),
(188, 238, 'https://htmlrev.com/images/uiverse-tailwind-template.jpg', 1),
(189, 239, 'https://htmlrev.com/images/penguin-ui-tailwind-template.jpg', 1),
(190, 240, 'https://htmlrev.com/images/pines-ui-tailwind-template.jpg', 1),
(191, 241, 'https://htmlrev.com/images/pinemix-tailwind-template.jpg', 1),
(192, 242, 'https://htmlrev.com/images/syntaxui-tailwind-template.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `template_stacks`
--

CREATE TABLE `template_stacks` (
  `id` int NOT NULL,
  `template_id` int NOT NULL,
  `stack_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `template_stacks`
--

INSERT INTO `template_stacks` (`id`, `template_id`, `stack_id`) VALUES
(1, 1, 8),
(2, 2, 2),
(3, 2, 3),
(4, 3, 1),
(5, 3, 3),
(7, 4, 3),
(6, 4, 6),
(8, 5, 5),
(9, 6, 2),
(10, 6, 3),
(11, 107, 3),
(12, 108, 3),
(13, 109, 3),
(14, 110, 3),
(15, 111, 3),
(16, 112, 3),
(17, 113, 3),
(18, 114, 3),
(19, 115, 3),
(20, 116, 3),
(21, 117, 3),
(22, 118, 3),
(23, 119, 3),
(24, 120, 3),
(25, 121, 3),
(26, 122, 3),
(27, 123, 3),
(28, 124, 3),
(29, 125, 3),
(30, 126, 3),
(31, 127, 3),
(32, 128, 3),
(33, 129, 3),
(34, 130, 3),
(35, 131, 3),
(36, 132, 3),
(37, 133, 3),
(38, 134, 3),
(39, 135, 3),
(40, 136, 3),
(41, 137, 3),
(42, 138, 3),
(43, 139, 3),
(44, 140, 3),
(45, 141, 3),
(46, 142, 3),
(47, 143, 3),
(48, 144, 3),
(49, 145, 3),
(50, 146, 3),
(51, 147, 3),
(52, 148, 3),
(53, 149, 3),
(54, 150, 3),
(55, 151, 3),
(56, 152, 3),
(57, 153, 3),
(58, 154, 3),
(59, 155, 3),
(60, 156, 3),
(61, 157, 3),
(62, 158, 3),
(63, 159, 3),
(64, 160, 3),
(65, 161, 3),
(66, 162, 3),
(67, 163, 3),
(68, 164, 3),
(69, 165, 3),
(70, 166, 3),
(71, 167, 3),
(72, 168, 3),
(73, 169, 3),
(74, 170, 3),
(75, 171, 3),
(76, 172, 3),
(77, 173, 3),
(78, 174, 3),
(79, 175, 3),
(80, 176, 3),
(81, 177, 3),
(82, 178, 3),
(83, 179, 3),
(84, 180, 3),
(85, 181, 3),
(86, 182, 3),
(87, 183, 3),
(88, 184, 3),
(89, 185, 3),
(90, 186, 3),
(91, 187, 3),
(92, 188, 3),
(93, 189, 3),
(94, 190, 3),
(95, 191, 3),
(96, 192, 3),
(97, 193, 3),
(98, 194, 3),
(99, 195, 3),
(100, 196, 3),
(101, 197, 3),
(102, 198, 3),
(103, 199, 3),
(104, 200, 3),
(105, 201, 3),
(106, 202, 3),
(107, 203, 3),
(108, 204, 3),
(109, 205, 3),
(110, 206, 3),
(111, 207, 3),
(112, 208, 3),
(113, 209, 3),
(114, 210, 3),
(115, 211, 3),
(116, 212, 3),
(117, 213, 3),
(118, 214, 3),
(119, 215, 3),
(120, 216, 3),
(121, 217, 3),
(122, 218, 3),
(123, 219, 3),
(124, 220, 3),
(125, 221, 3),
(126, 222, 3),
(127, 223, 3),
(128, 224, 3),
(129, 225, 3),
(130, 226, 3),
(131, 227, 3),
(132, 228, 3),
(133, 229, 3),
(134, 230, 3),
(135, 231, 3),
(136, 232, 3),
(137, 233, 3),
(138, 234, 3),
(139, 235, 3),
(140, 236, 3),
(141, 237, 3),
(142, 238, 3),
(143, 239, 3),
(144, 240, 3),
(145, 241, 3),
(146, 242, 3);

-- --------------------------------------------------------

--
-- Table structure for table `template_tags`
--

CREATE TABLE `template_tags` (
  `id` int NOT NULL,
  `template_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `template_tags`
--

INSERT INTO `template_tags` (`id`, `template_id`, `tag_id`) VALUES
(1, 1, 1),
(2, 1, 4),
(3, 1, 5),
(4, 2, 1),
(5, 2, 2),
(6, 2, 8),
(7, 3, 3),
(8, 3, 4),
(9, 4, 1),
(10, 4, 6),
(11, 5, 4),
(12, 5, 5),
(13, 6, 3),
(14, 6, 7),
(15, 110, 4),
(16, 115, 2),
(17, 115, 8),
(18, 119, 2),
(19, 126, 5),
(20, 132, 6),
(21, 133, 6),
(22, 134, 3),
(23, 134, 6),
(24, 135, 6),
(25, 136, 3),
(26, 136, 6),
(27, 136, 8),
(28, 137, 2),
(29, 148, 2),
(30, 153, 2),
(31, 157, 2),
(32, 157, 4),
(33, 160, 3),
(34, 161, 8),
(35, 163, 3),
(36, 164, 2),
(37, 168, 2),
(38, 170, 3),
(39, 178, 2),
(40, 182, 3),
(41, 184, 2),
(42, 190, 4),
(43, 192, 2),
(44, 197, 2),
(45, 202, 4),
(46, 220, 4),
(47, 222, 3),
(48, 227, 4),
(49, 234, 3),
(50, 234, 4),
(51, 240, 8),
(52, 241, 1),
(53, 242, 8);

-- --------------------------------------------------------

--
-- Table structure for table `upvotes`
--

CREATE TABLE `upvotes` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `template_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `upvotes`
--

INSERT INTO `upvotes` (`id`, `user_id`, `template_id`, `created_at`) VALUES
(1, 2, 1, '2026-04-11 08:48:04'),
(2, 3, 1, '2026-04-11 08:48:04'),
(3, 4, 2, '2026-04-11 08:48:04'),
(4, 5, 5, '2026-04-11 08:48:04'),
(5, 2, 3, '2026-04-11 08:48:04'),
(6, 3, 4, '2026-04-11 08:48:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `avatar_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `avatar_url`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'abdul_dev', 'abdul@templas.com', '$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G', 'admin', 'https://api.dicebear.com/9.x/notionists/svg?seed=Abdul', '2026-04-11 08:47:35', '2026-05-20 01:18:13', NULL),
(2, 'raffi_coder', 'raffi@gmail.com', '$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G', 'user', 'https://api.dicebear.com/9.x/notionists/svg?seed=Raffi', '2026-04-11 08:47:35', '2026-05-20 01:18:19', NULL),
(3, 'nathania_ui', 'nathania@gmail.com', '$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G', 'user', 'https://api.dicebear.com/9.x/notionists/svg?seed=Nathania', '2026-04-11 08:47:35', '2026-05-20 01:26:46', NULL),
(4, 'bani_frontend', 'bani@gmail.com', '$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G', 'user', 'https://api.dicebear.com/9.x/notionists/svg?seed=Bani', '2026-04-11 08:47:35', '2026-05-20 01:26:50', NULL),
(5, 'saki_design', 'saki@gmail.com', '$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G', 'user', 'https://api.dicebear.com/9.x/notionists/svg?seed=Saki', '2026-04-11 08:47:35', '2026-05-20 01:26:53', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_bookmark` (`user_id`,`template_id`),
  ADD KEY `template_id` (`template_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `template_id` (`template_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `stacks`
--
ALTER TABLE `stacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_source_identifier` (`source_identifier`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_category` (`category_id`);

--
-- Indexes for table `template_images`
--
ALTER TABLE `template_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `template_id` (`template_id`);

--
-- Indexes for table `template_stacks`
--
ALTER TABLE `template_stacks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_template_stack` (`template_id`,`stack_id`),
  ADD KEY `stack_id` (`stack_id`);

--
-- Indexes for table `template_tags`
--
ALTER TABLE `template_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_template_tag` (`template_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `upvotes`
--
ALTER TABLE `upvotes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_upvote` (`user_id`,`template_id`),
  ADD KEY `template_id` (`template_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stacks`
--
ALTER TABLE `stacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `template_images`
--
ALTER TABLE `template_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `template_stacks`
--
ALTER TABLE `template_stacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `template_tags`
--
ALTER TABLE `template_tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `upvotes`
--
ALTER TABLE `upvotes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `templates`
--
ALTER TABLE `templates`
  ADD CONSTRAINT `templates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `templates_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--
-- Constraints for table `template_images`
--
ALTER TABLE `template_images`
  ADD CONSTRAINT `template_images_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `template_stacks`
--
ALTER TABLE `template_stacks`
  ADD CONSTRAINT `template_stacks_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `template_stacks_ibfk_2` FOREIGN KEY (`stack_id`) REFERENCES `stacks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `template_tags`
--
ALTER TABLE `template_tags`
  ADD CONSTRAINT `template_tags_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `template_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `upvotes`
--
ALTER TABLE `upvotes`
  ADD CONSTRAINT `upvotes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `upvotes_ibfk_2` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
