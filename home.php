<?php get_header(); ?>

<?php if ( get_option('chameleon_featured') == 'on' ) get_template_part('includes/featured'); ?>		

<?php if ( get_option('chameleon_quote') == 'on' ) { ?>
	
<!-- CATEGORY NAME: FRASE -->
	
<?php } ?>

<div id="content-area">

	<?php if ( get_option('chameleon_blog_style') == 'false' ) { ?>
	
		<?php if ( get_option('chameleon_display_blurbs') == 'on' ){ ?>
			<div id="services" class="clearfix">
				<?php for ($i=1; $i <= 3; $i++) { ?>
					<?php query_posts('page_id=' . get_pageId(html_entity_decode(get_option('chameleon_home_page_'.$i)))); while (have_posts()) : the_post(); ?>
						<?php 
							global $more; $more = 0;
						?>
						<div class="service<?php if ( $i == 3 ) echo ' last2'; ?>">
							<h3 class="title"><?php the_title(); ?></h3>
							
							<?php if ($i != 3) {
								$thumb = '';
								#$width = 232;
								#$height = 117;
                                                                $width = 193;
								$height = 160;
								if ( 'on' == get_option('chameleon_responsive_layout') ){
									$width = 193;
									$height = 160;
								}
								$classtext = 'item-image';
								$titletext = get_the_title();
								$thumbnail = get_thumbnail($width,$height,$classtext,$titletext,$titletext,false,'etservice');
								$thumb = $thumbnail["thumb"];
								$et_service_link = get_post_meta($post->ID,'etlink',true) ? get_post_meta($post->ID,'etlink',true) : get_permalink();
                                                        }
                                                        else {
                                                            $thumb = '';
								#$width = 232;
								#$height = 117;
                                                                $width = 383;
								$height = 160;
								if ( 'on' == get_option('chameleon_responsive_layout') ){
									$width = 383;
									$height = 160;
								}
								$classtext = 'item-image';
								$titletext = get_the_title();
								$thumbnail = get_thumbnail($width,$height,$classtext,$titletext,$titletext,false,'etservice');
								$thumb = $thumbnail["thumb"];
								$et_service_link = get_post_meta($post->ID,'etlink',true) ? get_post_meta($post->ID,'etlink',true) : get_permalink();
                                                        
                                                        }
							?>
							<?php if ( $thumb <> '' ) { ?>
								<div class="thumb">
									<?php if($i!=3) { ?>
									<a href="<?php echo $et_service_link; ?>">
									<?php } ?>
										<?php print_thumbnail($thumb, $thumbnail["use_timthumb"], $titletext, $width, $height, $classtext); ?>
										<span class="more-icon"></span>
									</a>
								</div> <!-- end .thumb -->
							<?php } ?>
							
							<?php the_content(''); ?>
						</div> <!-- end .service -->
					<?php endwhile; wp_reset_query(); ?>
				<?php } ?>
			</div> <!-- end #services -->
		<?php } ?>
		
		

		<div id="category-name2"> 
		<!-- riga che divide le sezioni -->
		</div> <!-- end .category-name2 -->
		 


		<div id="from-blog2">			
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Homepage') ) : ?> 
			<?php endif; ?>
		</div> <!-- end #from-blog -->

		
		
		<?php if ( get_option('chameleon_display_media') == 'on' ) { ?>
			<div id="multi-media-bar">
			
			
				<h3 class="title"><?php esc_html_e('Gallerie fotografiche','Chameleon'); ?></h3>
				<div id="et-multi-media" class="clearfix">
					<a id="left-multi-media" href="#"><?php esc_html_e('Previous','Chameleon'); ?></a>
					<a id="right-multi-media" href="#"<?php esc_html_e('Next','Chameleon'); ?>></a>
					<?php echo do_shortcode( '[album id=2 template=compact]' ); ?>	
				</div> <!-- end #et-multi-media -->	
				
				
				
				
				<div style="margin-top:10px"><p style="text-align: center;"><a href="http://www.facebook.com/areaonlus?ref=hl" target="_blank" rel="attachment wp-att-766"><img class="alignnone size-full wp-image-766" title="facebook_logo" src="http://195.103.90.62/wp-content/uploads/2012/07/facebook_logo.png" alt="" width="50" height="49" style="margin-right: 40px" /></a><a href="http://vimeo.com/areaonlus" target="_blank" rel="attachment wp-att-765"><img class="alignnone size-full wp-image-765" title="vimeo_logo" src="http://195.103.90.62/wp-content/uploads/2012/09/vimeo_logo.png" alt="" width="50" height="50" style="margin-right: 40px" /></a><a href="mailto:contatti@areato.org" target="_blank" rel="attachment wp-att-767"><img class="alignnone size-full wp-image-767" title="e-mail-logo" src="http://195.103.90.62/wp-content/uploads/2012/09/e-mail-logo.png" alt="" width="50" height="50" /></a></p></div>

	
			</div> <!-- end #multi-media-bar -->


			<div id="from-blog3">			
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Homepage_2') ) : ?> 
			<?php endif; ?>
		</div> <!-- end #from-blog3 -->


			<?php if ( '' != $et_videos_output ) echo '<div class="et_embedded_videos">' . $et_videos_output . '</div>'; ?>
		<?php } ?>
			
		<div class="clear"></div>
		
	<?php } else { ?>
		<div id="left-area">
			<?php get_template_part('includes/entry','home'); ?>
		</div> 	<!-- end #left-area -->

		<?php get_sidebar(); ?>
		<div class="clear"></div>
	<?php } ?>
	
</div> <!-- end #content-area -->

<?php get_footer(); ?>