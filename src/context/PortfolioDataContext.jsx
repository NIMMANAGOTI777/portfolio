import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  ACHIEVEMENTS as STATIC_ACHIEVEMENTS, 
  PROJECTS as STATIC_PROJECTS, 
  WORK_WITH_ME_SERVICES as STATIC_SERVICES, 
  CERTIFICATIONS as STATIC_CERTIFICATIONS, 
  TESTIMONIAL as STATIC_TESTIMONIAL, 
  COLLABORATIONS as STATIC_COLLABORATIONS,
  STATS as STATIC_STATS
} from '../lib/portfolioData';

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [speakingEvents, setSpeakingEvents] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to log admin activity
  const logActivity = async (action, entityType, entityId, description, metadata = {}) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const adminEmail = session?.user?.email || 'admin@karthik.dev';
      const newLog = {
        action,
        entity_type: entityType,
        entity_id: entityId,
        description,
        admin_email: adminEmail,
        metadata,
        created_at: new Date().toISOString()
      };
      await supabase.from('activity_logs').insert([newLog]);
      setActivityLogs(prev => [newLog, ...prev]);
    } catch (e) {
      console.warn('Could not log activity:', e);
    }
  };

  // Fetch all live data from Supabase
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Projects
      const { data: projData } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
      if (projData && projData.length > 0) {
        setProjects(projData);
      }

      // 2. Achievements
      const { data: achData } = await supabase.from('achievements').select('*').order('display_order', { ascending: true });
      if (achData && achData.length > 0) {
        setAchievements(achData);
      }

      // 3. Experiences
      const { data: expData } = await supabase.from('experiences').select('*').order('display_order', { ascending: true });
      if (expData && expData.length > 0) {
        setExperiences(expData);
      }

      // 4. Services (Filter out any accidental AI Automation)
      const { data: srvData } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (srvData && srvData.length > 0) {
        const filteredServices = srvData.filter(s => !s.title?.toLowerCase().includes('ai automation'));
        setServices(filteredServices);
      }

      // 5. Testimonials
      const { data: testData } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
      if (testData && testData.length > 0) {
        setTestimonials(testData);
      }

      // 6. Certifications
      const { data: certData } = await supabase.from('certifications').select('*').order('display_order', { ascending: true });
      if (certData && certData.length > 0) {
        setCertifications(certData);
      }

      // 7. Speaking Events
      const { data: spkData } = await supabase.from('speaking_events').select('*').order('display_order', { ascending: true });
      if (spkData && spkData.length > 0) {
        setSpeakingEvents(spkData);
      }

      // 8. Media Items
      const { data: medData } = await supabase.from('media_items').select('*').order('created_at', { ascending: false });
      if (medData) {
        setMediaItems(medData);
      }

      // 9. Contact Inquiries
      const { data: inqData } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
      if (inqData) {
        setInquiries(inqData);
      }

      // 10. Social Links
      const { data: socData } = await supabase.from('social_links').select('*').order('display_order', { ascending: true });
      if (socData && socData.length > 0) {
        setSocialLinks(socData);
      }

      // 11. Site Settings
      const { data: setmData } = await supabase.from('site_settings').select('*');
      if (setmData && setmData.length > 0) {
        const map = {};
        setmData.forEach(item => { map[item.key] = item.value; });
        setSiteSettings(map);
      }

      // 12. Activity Logs
      const { data: logData } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(50);
      if (logData) {
        setActivityLogs(logData);
      }

    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // ==========================================
  // CRUD OPERATIONS
  // ==========================================

  // --- PROJECTS ---
  const saveProject = async (projectData) => {
    const isNew = !projects.some(p => p.id === projectData.id);
    const payload = {
      ...projectData,
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      payload.created_at = new Date().toISOString();
      payload.display_order = projectData.display_order || projects.length + 1;
      await supabase.from('projects').insert([payload]);
      await logActivity('Created Project', 'project', payload.id, `Created new project "${payload.title}"`);
    } else {
      await supabase.from('projects').update(payload).eq('id', payload.id);
      await logActivity('Updated Project', 'project', payload.id, `Updated project "${payload.title}"`);
    }
    await refreshData();
  };

  const deleteProject = async (id) => {
    const project = projects.find(p => p.id === id);
    await supabase.from('projects').delete().eq('id', id);
    await logActivity('Deleted Project', 'project', id, `Deleted project "${project?.title || id}"`);
    await refreshData();
  };

  const reorderProjects = async (reorderedProjects) => {
    setProjects(reorderedProjects);
    for (let i = 0; i < reorderedProjects.length; i++) {
      await supabase.from('projects').update({ display_order: i + 1 }).eq('id', reorderedProjects[i].id);
    }
    await logActivity('Reordered Projects', 'project', 'all', 'Updated projects display order');
  };

  // --- ACHIEVEMENTS ---
  const saveAchievement = async (achievementData) => {
    const isNew = !achievements.some(a => a.id === achievementData.id);
    const payload = {
      ...achievementData,
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      payload.created_at = new Date().toISOString();
      payload.display_order = achievementData.display_order || achievements.length + 1;
      await supabase.from('achievements').insert([payload]);
      await logActivity('Created Achievement', 'achievement', payload.id, `Created achievement "${payload.title}"`);
    } else {
      await supabase.from('achievements').update(payload).eq('id', payload.id);
      await logActivity('Updated Achievement', 'achievement', payload.id, `Updated achievement "${payload.title}"`);
    }
    await refreshData();
  };

  const deleteAchievement = async (id) => {
    const achievement = achievements.find(a => a.id === id);
    await supabase.from('achievements').delete().eq('id', id);
    await logActivity('Deleted Achievement', 'achievement', id, `Deleted achievement "${achievement?.title || id}"`);
    await refreshData();
  };

  const reorderAchievements = async (reorderedAchievements) => {
    setAchievements(reorderedAchievements);
    for (let i = 0; i < reorderedAchievements.length; i++) {
      await supabase.from('achievements').update({ display_order: i + 1 }).eq('id', reorderedAchievements[i].id);
    }
    await logActivity('Reordered Achievements', 'achievement', 'all', 'Updated achievements display order');
  };

  // --- EXPERIENCES ---
  const saveExperience = async (expData) => {
    const isNew = !experiences.some(e => e.id === expData.id);
    const payload = {
      ...expData,
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      payload.created_at = new Date().toISOString();
      payload.display_order = expData.display_order || experiences.length + 1;
      await supabase.from('experiences').insert([payload]);
      await logActivity('Created Experience', 'experience', payload.id, `Created experience at "${payload.company}"`);
    } else {
      await supabase.from('experiences').update(payload).eq('id', payload.id);
      await logActivity('Updated Experience', 'experience', payload.id, `Updated experience at "${payload.company}"`);
    }
    await refreshData();
  };

  const deleteExperience = async (id) => {
    const exp = experiences.find(e => e.id === id);
    await supabase.from('experiences').delete().eq('id', id);
    await logActivity('Deleted Experience', 'experience', id, `Deleted experience "${exp?.company || id}"`);
    await refreshData();
  };

  const reorderExperiences = async (reordered) => {
    setExperiences(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await supabase.from('experiences').update({ display_order: i + 1 }).eq('id', reordered[i].id);
    }
    await logActivity('Reordered Experience', 'experience', 'all', 'Updated experiences display order');
  };

  // --- FREELANCE SERVICES ---
  const saveService = async (srvData) => {
    // Safety check: ensure title is not AI automation
    if (srvData.title?.toLowerCase().includes('ai automation')) {
      throw new Error('AI Automation cannot be added as a freelance service.');
    }
    const isNew = !services.some(s => s.id === srvData.id);
    const payload = {
      ...srvData,
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      payload.created_at = new Date().toISOString();
      payload.display_order = srvData.display_order || services.length + 1;
      await supabase.from('services').insert([payload]);
      await logActivity('Created Service', 'service', payload.id, `Created service "${payload.title}"`);
    } else {
      await supabase.from('services').update(payload).eq('id', payload.id);
      await logActivity('Updated Service', 'service', payload.id, `Updated service "${payload.title}"`);
    }
    await refreshData();
  };

  const deleteService = async (id) => {
    const srv = services.find(s => s.id === id);
    await supabase.from('services').delete().eq('id', id);
    await logActivity('Deleted Service', 'service', id, `Deleted service "${srv?.title || id}"`);
    await refreshData();
  };

  const reorderServices = async (reordered) => {
    setServices(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await supabase.from('services').update({ display_order: i + 1 }).eq('id', reordered[i].id);
    }
    await logActivity('Reordered Services', 'service', 'all', 'Updated services display order');
  };

  // --- TESTIMONIALS ---
  const saveTestimonial = async (testData) => {
    const isNew = !testimonials.some(t => t.id === testData.id);
    const payload = {
      ...testData,
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      payload.created_at = new Date().toISOString();
      payload.display_order = testData.display_order || testimonials.length + 1;
      await supabase.from('testimonials').insert([payload]);
      await logActivity('Created Testimonial', 'testimonial', payload.id, `Created testimonial by "${payload.name}"`);
    } else {
      await supabase.from('testimonials').update(payload).eq('id', payload.id);
      await logActivity('Updated Testimonial', 'testimonial', payload.id, `Updated testimonial by "${payload.name}"`);
    }
    await refreshData();
  };

  const deleteTestimonial = async (id) => {
    const t = testimonials.find(item => item.id === id);
    await supabase.from('testimonials').delete().eq('id', id);
    await logActivity('Deleted Testimonial', 'testimonial', id, `Deleted testimonial by "${t?.name || id}"`);
    await refreshData();
  };

  // --- CERTIFICATIONS ---
  const saveCertification = async (certData) => {
    const isNew = !certifications.some(c => c.id === certData.id);
    const payload = {
      ...certData,
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      payload.created_at = new Date().toISOString();
      payload.display_order = certData.display_order || certifications.length + 1;
      await supabase.from('certifications').insert([payload]);
      await logActivity('Created Certification', 'certification', payload.id, `Created certification "${payload.title}"`);
    } else {
      await supabase.from('certifications').update(payload).eq('id', payload.id);
      await logActivity('Updated Certification', 'certification', payload.id, `Updated certification "${payload.title}"`);
    }
    await refreshData();
  };

  const deleteCertification = async (id) => {
    const c = certifications.find(item => item.id === id);
    await supabase.from('certifications').delete().eq('id', id);
    await logActivity('Deleted Certification', 'certification', id, `Deleted certification "${c?.title || id}"`);
    await refreshData();
  };

  // --- SPEAKING EVENTS ---
  const saveSpeakingEvent = async (spkData) => {
    const isNew = !speakingEvents.some(s => s.id === spkData.id);
    const payload = {
      ...spkData,
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      payload.created_at = new Date().toISOString();
      payload.display_order = spkData.display_order || speakingEvents.length + 1;
      await supabase.from('speaking_events').insert([payload]);
      await logActivity('Created Speaking Event', 'speaking_event', payload.id, `Created event "${payload.title}"`);
    } else {
      await supabase.from('speaking_events').update(payload).eq('id', payload.id);
      await logActivity('Updated Speaking Event', 'speaking_event', payload.id, `Updated event "${payload.title}"`);
    }
    await refreshData();
  };

  const deleteSpeakingEvent = async (id) => {
    const spk = speakingEvents.find(s => s.id === id);
    await supabase.from('speaking_events').delete().eq('id', id);
    await logActivity('Deleted Speaking Event', 'speaking_event', id, `Deleted event "${spk?.title || id}"`);
    await refreshData();
  };

  // --- MEDIA LIBRARY ---
  const saveMediaItem = async (mediaData) => {
    const payload = {
      ...mediaData,
      created_at: new Date().toISOString()
    };
    await supabase.from('media_items').insert([payload]);
    await logActivity('Uploaded Media', 'media', payload.id, `Added media "${payload.title}" to library`);
    await refreshData();
  };

  const deleteMediaItem = async (id) => {
    const med = mediaItems.find(m => m.id === id);
    await supabase.from('media_items').delete().eq('id', id);
    await logActivity('Deleted Media', 'media', id, `Deleted media "${med?.title || id}"`);
    await refreshData();
  };

  // --- CONTACT INQUIRIES ---
  const updateInquiryStatus = async (id, status, notes = '') => {
    await supabase.from('contact_inquiries').update({ status, notes, updated_at: new Date().toISOString() }).eq('id', id);
    await logActivity('Updated Inquiry Status', 'inquiry', id, `Set status to "${status}"`);
    await refreshData();
  };

  const deleteInquiry = async (id) => {
    await supabase.from('contact_inquiries').delete().eq('id', id);
    await logActivity('Deleted Inquiry', 'inquiry', id, 'Deleted contact inquiry');
    await refreshData();
  };

  const submitContactInquiry = async (inquiryData) => {
    const payload = {
      full_name: inquiryData.full_name || inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone || '',
      project_type: inquiryData.project_type || inquiryData.purpose || 'General Inquiry',
      message: inquiryData.message,
      status: 'New',
      created_at: new Date().toISOString()
    };
    const res = await supabase.from('contact_inquiries').insert([payload]);
    await refreshData();
    return res;
  };

  // --- SITE SETTINGS & SEO ---
  const saveSiteSettings = async (key, value) => {
    await supabase.from('site_settings').upsert({ key, value });
    setSiteSettings(prev => ({ ...prev, [key]: value }));
    await logActivity('Updated Settings', 'settings', key, `Updated settings section "${key}"`);
    await refreshData();
  };

  // --- SOCIAL LINKS ---
  const saveSocialLinks = async (linksList) => {
    for (const link of linksList) {
      await supabase.from('social_links').upsert(link);
    }
    setSocialLinks(linksList);
    await logActivity('Updated Social Links', 'social', 'all', 'Updated public social media links');
    await refreshData();
  };

  // Public Access Data (Only published items, with safe fallbacks and normalized field names)
  const publicProjects = (projects.length > 0 ? projects : STATIC_PROJECTS)
    .filter(p => p.published !== false)
    .map(p => ({
      ...p,
      id: p.id,
      title: p.title || '',
      sub: p.sub || p.subtitle || '',
      subtitle: p.subtitle || p.sub || '',
      desc: p.desc || p.short_description || p.full_description || '',
      short_description: p.short_description || p.desc || '',
      tag: p.tag || p.category || '',
      category: p.category || p.tag || '',
      tech: p.tech || p.technologies || p.tags || [],
      tags: p.tags || p.technologies || p.tech || [],
      technologies: p.technologies || p.tech || p.tags || [],
      image: p.image || p.cover_image || '',
      cover_image: p.cover_image || p.image || '',
      link: p.link || p.project_url || '#',
      project_url: p.project_url || p.link || '#',
      caseStudy: p.caseStudy || p.case_study || null,
      case_study: p.case_study || p.caseStudy || null,
      eyebrow: p.eyebrow || 'FEATURED PROJECT',
      badgeSecondary: p.badgeSecondary || p.badge_secondary || '',
      badge_secondary: p.badge_secondary || p.badgeSecondary || '',
      result: p.result || '',
      actionLabel: p.actionLabel || p.action_label || 'VIEW CASE STUDY →',
      action_label: p.action_label || p.actionLabel || 'VIEW CASE STUDY →',
      secondaryActionLabel: p.secondaryActionLabel || p.secondary_action_label || '',
      secondary_action_label: p.secondary_action_label || p.secondaryActionLabel || '',
      featured: !!p.featured
    }));

  const publicAchievements = (achievements.length > 0 ? achievements : STATIC_ACHIEVEMENTS)
    .filter(a => a.published !== false);

  const publicExperiences = experiences.filter(e => e.published !== false);

  const publicServices = (services.length > 0 ? services : STATIC_SERVICES)
    .filter(s => s.published !== false)
    .map(s => ({
      ...s,
      id: s.id,
      title: s.title || '',
      description: s.description || s.short_description || '',
      services: s.services || s.features || s.skills || [],
      techStack: s.techStack || s.tech_stack || [],
      tech_stack: s.tech_stack || s.techStack || [],
      icon: s.icon || 'sparkles',
      iconBgClass: s.iconBgClass || s.icon_bg_class || 'bg-indigo-500/10 text-indigo-400'
    }));

  const publicTestimonials = (testimonials.length > 0 ? testimonials : [STATIC_TESTIMONIAL])
    .filter(t => t.published !== false)
    .map(t => ({
      ...t,
      id: t.id,
      name: t.name || '',
      role: t.role || '',
      company: t.company || '',
      quote: t.quote || t.testimonial || '',
      testimonial: t.testimonial || t.quote || '',
      img: t.img || t.avatar_url || t.image || '',
      image: t.image || t.avatar_url || t.img || '',
      avatar_url: t.avatar_url || t.img || t.image || '',
      linkedin: t.linkedin || t.linkedin_url || '',
      linkedin_url: t.linkedin_url || t.linkedin || ''
    }));

  const publicCertifications = (certifications.length > 0 ? certifications : STATIC_CERTIFICATIONS)
    .filter(c => c.published !== false)
    .map(c => ({
      ...c,
      id: c.id,
      title: c.title || '',
      issuer: c.issuer || '',
      date: c.date || c.issue_date || '2026',
      desc: c.desc || c.description || '',
      description: c.description || c.desc || '',
      img: c.img || c.certificate_image || '',
      certificate_image: c.certificate_image || c.img || '',
      link: c.link || c.credential_url || '#',
      credential_url: c.credential_url || c.link || '#',
      code: c.code || c.credential_id || '',
      credential_id: c.credential_id || c.code || ''
    }));

  const publicSpeakingEvents = (speakingEvents.length > 0 ? speakingEvents : STATIC_COLLABORATIONS)
    .filter(s => s.published !== false)
    .map(s => ({
      ...s,
      id: s.id,
      title: s.title || '',
      category: s.category || s.tag || s.event_name || 'Collaboration',
      tag: s.tag || s.category || s.event_name || 'Collaboration',
      date: s.date || '2026',
      attendees: s.attendees || (s.audience_size ? `${s.audience_size} Attendees` : ''),
      desc: s.desc || s.description || '',
      description: s.description || s.desc || '',
      img: s.img || s.image_url || s.image || '',
      image_url: s.image_url || s.img || s.image || '',
      roles: s.roles || (s.key_topics ? s.key_topics : []),
      links: s.links || { linkedin: s.recording_url || '', youtube: '', instagram: '' }
    }));

  const publicSocialLinks = socialLinks.filter(s => s.enabled !== false);

  const value = {
    loading,
    refreshData,
    // Datasets
    projects,
    achievements,
    experiences,
    services,
    testimonials,
    certifications,
    speakingEvents,
    mediaItems,
    inquiries,
    socialLinks,
    siteSettings,
    activityLogs,
    // Public Filtered Data
    publicProjects: publicProjects.length > 0 ? publicProjects : STATIC_PROJECTS,
    publicAchievements: publicAchievements.length > 0 ? publicAchievements : STATIC_ACHIEVEMENTS,
    publicExperiences,
    publicServices: publicServices.length > 0 ? publicServices : STATIC_SERVICES,
    publicTestimonials: publicTestimonials.length > 0 ? publicTestimonials : [STATIC_TESTIMONIAL],
    publicCertifications: publicCertifications.length > 0 ? publicCertifications : STATIC_CERTIFICATIONS,
    publicSpeakingEvents: publicSpeakingEvents.length > 0 ? publicSpeakingEvents : STATIC_COLLABORATIONS,
    publicSocialLinks,
    // CRUD Functions
    saveProject,
    deleteProject,
    reorderProjects,
    saveAchievement,
    deleteAchievement,
    reorderAchievements,
    saveExperience,
    deleteExperience,
    reorderExperiences,
    saveService,
    deleteService,
    reorderServices,
    saveTestimonial,
    deleteTestimonial,
    saveCertification,
    deleteCertification,
    saveSpeakingEvent,
    deleteSpeakingEvent,
    saveMediaItem,
    deleteMediaItem,
    updateInquiryStatus,
    deleteInquiry,
    submitContactInquiry,
    saveSiteSettings,
    saveSocialLinks,
    logActivity
  };

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
