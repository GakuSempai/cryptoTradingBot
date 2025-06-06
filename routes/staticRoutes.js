const express = require('express');
const router = express.Router();

router.get('/about_us', (req, res) => {
  res.render('about_us');
});

router.get('/blog_detail_view', (req, res) => {
  res.render('blog_detail_view');
});

router.get('/our_blog', (req, res) => {
  res.render('our_blog');
});

router.get('/coming_soon', (req, res) => {
  res.render('coming_soon');
});

router.get('/contact_us', (req, res) => {
  res.render('contact_us');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/error_404', (req, res) => {
  res.render('error_404');
});

router.get('/faq', (req, res) => {
  res.render('faq');
});

router.get('/help_article_detail_view', (req, res) => {
  res.render('help_article_detail_view');
});

router.get('/help_center', (req, res) => {
  res.render('help_center');
});

router.get('/help_center_knowledge_base', (req, res) => {
  res.render('help_center_knowledge_base');
});

router.get('/help_section_detail_view', (req, res) => {
  res.render('help_section_detail_view');
});

router.get('/pricing', (req, res) => {
  res.render('pricing');
});

router.get('/privacy_policy', (req, res) => {
  res.render('privacy_policy');
});

router.get('/sell_tickets_online', (req, res) => {
  res.render('sell_tickets_online');
});

router.get('/term_and_conditions', (req, res) => {
  res.render('term_and_conditions');
});

module.exports = router;
