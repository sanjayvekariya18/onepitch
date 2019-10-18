<?php

namespace App\Services;



class KeywordService
{
    /**
     * @return array
     */
    public static function getIndustryKeywords ()
    {
        return [
            '3D Printing' => ['3d', 'printer', 'printing', '3d printing', '3d printer', 'metal 3d printer', 'best 3d printer', '3d printer filament', '3d printer systems', '3d printer price', '3d printing'],
            'AdTech' => ['ad', 'advertising', 'adtech', 'ads', 'ad tech', 'advertising technology', 'adtech', 'mobile adtech', 'native ads'],
            'AgTech' => ['agriculture', 'agribusiness', 'farmtech', 'farm', 'agtech', 'ag', 'plant embryo transfer', 'farm bubbles', 'agriculture technology','ag technologies', 'ag tech'],
            'AI' => ['artificial', 'intelligence', 'ai', 'artificial intelligence', 'ai technology'],
            'Apps' => ['apps', 'applications', 'store', 'appstore', 'iTunes store', 'app store', 'app store', 'android applications'],
            'AudioTech' => ['audio', 'sound', 'audio technology', 'audio tech', 'sound systems', 'sound technology'],
            'AR' => ['augmented', 'reality', 'ar', 'augmented reality'],
            'Arts & Culture' => ['entertainment', 'culture', 'arts', 'arts and culture', 'pop culture'],
            'Autonomous Vehicles' => ['autonomous', 'autopiloting', 'autopilot', 'automated', 'vehicles', 'autonomous vehicles', 'automated vehicles', 'manless vehicle', 'unmanned vehicle'],
            'Big Data' => ['data', 'hadoop', 'dock', 'big data', 'business insights', 'data analytics', 'hyper converged data center', 'data analysis'],
            'BioTech' => ['biotech', 'biometrics', 'dna', 'crispr', 'bio tech', 'bio technology', 'bio augmentation'],
            'Blockchain' => ['node', 'blockchain', 'blocks', 'block chain'],
            'Cannabis' => ['cannabis', 'dispensary', 'grower', 'THC', 'cannabaceae', 'marijuana', 'CBD', 'hemp infused'],
            'CleanTech' => ['environment', 'cleantech', 'environmental', 'environmental impact', 'environmental footprint'],
            'Cloud Computing & Storage' => ['cloud', 'storage', 'data-center', 'data center', 'cloud computing', 'cloud storage', 'data storage'],
            'Consumer Tech Products' => ['augmented', 'reality', 'system', 'mobile', 'consumer tech', 'consumer products', 'product for consumers'],
            'Cryptocurrency' => ['cryptocurrency', 'crypto', 'bitcoin', 'cryptocurrencies', 'currency', 'crypto currency'],
            'Cybersecurity' => ['cybersecurity', 'cyberattack', 'hack', 'hacker', 'hackers', 'hacking', 'hacked', 'cyber security', 'adaptive security'],
            'Drones' => ['drone', 'drones', 'unmanned aerial vehicle'],
            'E-Commerce' => ['ecommerce', 'e-commerce', 'shopify', 'magento', 'store', 'amazon', 'ebay', 'internet store', 'digital marketplace', 'online shop', 'online marketplace'],
            'EdTech' => ['educational', 'education', 'edtech', 'smartboard', 'school', 'college', 'educational technology'],
            'Energy Tech' => ['energy', 'renewable energy', 'carbon footprint', 'energy tech', 'energy technology'],
            'eSports' => ['esports', 'sports', 'gaming', 'e-sports', 'digital sports', 'online sports', 'gaming', 'digital competition', 'game conference', 'gaming conference', 'e sports'],
            'FinTech' => ['fintech', 'financial', 'finance', 'investing', 'invested', 'fund', 'financial tech', 'financial technology', 'fund tech'],
            'FoodTech' => ['foodtech', 'food', 'cafeteria', 'food tech', 'food technology', 'dining hall'],
            'Gig Economy' => ['economy', 'freelance', 'gig', 'gig economy', 'temporary jobs', 'independent workers'],
            'GovTech' => ['government', 'govtech', 'government technology'],
            'HealthTech' => ['healthtech', 'health', 'hospitals', 'hospital', 'medical', 'laboratory', 'lab', 'health technology', 'health tech', 'medical advancement', 'medical advances', 'lab testing', 'lab test'],
            'HR Tech' => ['hr', 'human', 'hrtech', 'human resource', 'human resource technology', 'hr tech'],
            'Infrastructure' => ['infrastructure', 'civil engineering'],
            'IaaS' => ['iaas', 'infrastructure', 'iaas cloud', 'infrastructure as a service'],
            'IoT' => ['iot', 'internet of things', 'machine learning'],
            'IIoT' => ['iiot'],
            'Legal Tech' => ['legal', 'law', 'legal tech', 'legal technology'],
            'Lifestyle & Wellness Tech' => ['wellness', 'lifestyle', 'wellness tech', 'lifestyle tech'],
            'Manufacturing' => ['manufacturing'],
            'MarTech' => ['marketing', 'martech', 'cms', 'crm', 'marketing software', 'marketing service', 'marketing technology'],
            'Mobile' => ['phone', 'mobile', 'tablet', 'cellular', 'mobiletech', 'cell phone', 'mobile technology'],
            'Music Tech' => ['musictech', 'music', 'instrument', 'instruments', 'music tech', 'music technology'],
            'Nanotechnology' => ['nanotechnology', 'nano', 'microtechnology', 'nanoscopic'],
            'Network Computing' => ['network', 'server', 'networking', 'computing', 'network computing', 'server network', 'network data'],
            'PaaS' => ['paas', 'platform', 'application', 'platform as a service', 'application platform as a service', 'platform based service'],
            'PetTech' => ['pettech', 'pet', 'animal', 'pet tech', 'pet technology', 'animal training'],
            'PharmTech' => ['pharmacy', 'pharmtech', 'pharm', 'pharmacy technology', 'pharmacy tech', 'pharm tech'],
            'PR, Marketing, Advertising' => ['pr', 'public', 'marketing', 'advertising', 'public relations'],
            'Real Estate Tech' => ['estate', 'real estate', 'real estate technology', 'real estate tech'],
            'Robotics' => ['robot', 'robotics', 'virtual robots', 'virtual assistant'],
            'SaaS' => ['saas', 'software', 'software as a service'],
            'Smart Home Tech' => ['home', 'house','smart home tech', 'connected house', 'connected home', 'digital home', 'home automation'],
            'Social Media' => ['social', 'media', 'facebook', 'twitter', 'linkedin', 'instagram', 'reddit', 'social media'],
            'Semiconductors' => ['semiconductors'],
            'SpaceTech' => ['space', 'spacetech','space tech', 'space technology'],
            'SportsTech' => ['sportstech', 'sports', 'sports tech', 'sports technology'],
            'Telecom' => ['telecom', 'telecomm', 'telecommunications'],
            'Venture Capital' => ['vc', 'venture', 'capital', 'fund', 'funded', 'raised', 'venture capital'],
            'Video Tech' => ['video', 'cinematography', 'special effects', 'video tech', 'video technology', 'special effects'],
            'VR' => ['virtual', 'reality', 'vr', 'virtual reality'],
            'Wearables' => ['wearable', 'wearables', 'smart watch', 'smart devices'],
        ];
    }

    /**
     * @return array
     */
    public static function getTopicKeywords ()
    {
        return [
            'Business to Business' => ['B2B', 'Business 2 Business', 'Business to Business'],
            'Business to Consumer' => ['B2C', 'Business 2 Consumer', 'Business to Consumer'],
            'Commentary for Breaking/Current Events' => ['commentary', 'comment', 'breaking', 'newsjack', 'newsjacking', 'commentary on breaking news', 'commentary on breaking events', 'breaking news', 'current events', 'available for comment', ‘event’],
            'Company Culture' => ['culture', 'workplace', 'employees', 'company culture', 'workplace culture', 'employee culture', 'work culture', 'office culture', 'executive leadership', 'employee management'],
            'Contract/Partnership Announcement' => ['contract', 'partnership', 'partnering', 'partnered', 'contract announcement', 'contract agreement', 'contract with', 'contract between', 'partnership announcement', 'partnership agreement', 'partnered with', 'partnering with', 'partnership between', 'company agreement', 'contract win'],
            'Earnings' => ['earnings', 'company earnings', 'quarterly earnings', 'company profits', 'quarterly profits', 'company revenue', 'quarterly revenue', 'yearly earnings', 'yearly profits', 'end of year earnings', 'end of year profits', 'earnings announcement', 'earnings estimates'],
            'Entrepreneurship' => ['entrepreneurship', 'entrepreneur', 'entrepreneurs', 'entrepreneurial', 'businessman', 'businesswoman', 'enterpriser', 'entrepreneur launching startup', 'entrepreneur journey', 'entrepreneurs launching new company', 'entrepreneur and founder', 'founder of startup', 'founding partner'],
            'Environmental' => ['environmental', 'environment', 'eco', 'eco-friendly', 'earth', 'planet', 'ecosystem', 'environmentally friendly', 'eco-friendly environment', 'eco-friendly', 'global warming', 'climate change', 'natural environment'],
//            'Events/Embargoes' => ['event', 'embargo', 'agree to embargo', 'hold for embargo', 'hold story until'],
            'Executive Compensation' => ['executive', 'compensation', 'compensate', 'compensated', 'salary', 'executive compensation', 'executive pay', 'executive payment', 'CEO compensation', 'CFO compensation', 'COO compensation', 'CMO compensation', 'CTO compensation', 'executive financial compensation', 'stock options',' executive salary', 'executive bonus'],
            'Existing Product/Service Update' => ['update', 'enhanced', 'enhancement', 'product update', 'updated product', 'service update', 'updated service', 'enhanced product feature', 'enhanced service feature', 'product enhancement', 'service enhancement', 'new product    feature',  'new service feature', 'improved product', 'improved service'],
            'Funding & Exits (Private or Public)' => ['funding', 'round', 'exit', 'seed', 'downround', 'funding round', 'Series A', 'Series B', 'Series C', 'company exit', 'seed stage', 'investment round', 'venture round', 'venture funding', 'secure funding', 'secured funding', 'funding investment', 'exit strategy', 'seed round', 'angel round', 'raise funds', 'raise funding'],
            'Gift Guide' => ['gift', 'deal', 'list', 'gift guide', 'christmas gift', 'holiday gift', 'easter gift', 'graduation gift', 'valentine\'s day gift', 'mother\'s day', 'father\'s day', 'back to school'],
            'Hirings/Departures' => ['hiring', 'hire', 'departure', 'depart', 'firing', 'fire', 'executive hiring', 'executive departure', 'announces hiring', 'announces departure', 'parted ways with'],
            'Industry Trends' => ['trend', 'trends', 'trending', 'industry trend', 'industry trends', 'market trend', 'market trends', 'trend forecast', 'trend report', 'trend reporting', 'industry regulations'],
            'Initial Coin Offering (ICO)' => ['coin', 'ICO', 'initial coin offering', 'cryptocurrency venture', 'virtual tokens', 'digital currency offering', 'cryptocurrency offering', 'virtual currency offering', 'digital coin offering'],
            'Initial Public Offering (IPO)' => ['IPO', 'initial public offering', 'go public', 'publicly traded', 'investment capital', 'stock offering', 'offering price', 'direct public offering', 'direct listing', 'going public'],
            'Interview Opportunity' => ['interview', 'available to interview', 'speaking opportunity', 'speaking engagement', 'speaking gig', 'interview opportunity', 'available to speak', 'speaking spot', 'interview spot'],
            'Mergers & Acquisitions' => ['merger', 'merge', 'acquire', 'acquired', 'acquisition', 'M&A', 'consolidation', 'takeover', 'company merger', 'company acquisition', 'merged with', 'tender offer', 'acquisition of assets', 'management acquisition', 'joint organization', 'corporate restructure', 'horizontal merger', 'vertical merger', 'reverse merger'],
            'Minority Topics' => ['minority', 'LGBT', 'underprivileged', 'diversity', 'gender', 'race', 'religion', 'minority topics', 'LGBT', 'underprivileged persons', 'underprivileged communities', 'sexual orientation', 'sexual identification', 'racial identification'],
            'New Company Launches' => ['new company launch'],
            'New Location Opening/Expansion' => ['new location', 'company expansion', 'expanding location', 'company opening new location'],
            'New Product/Service Launches' => ['new product launch', 'new service launch', 'launching new product', 'launching new service'],
            'Private Equity (PE)' => ['PE', 'privately-held', 'equity', 'private equity'],
            'Product Roundup' => ['roundup', 'list', 'deal', 'deals', 'lists', 'product roundup', 'roundup list'],
            'Product Safety' => ['safety', 'protection', 'safeguard', 'product safety', 'safety in the workplace'],
            'Professional Development' => ['mentor', 'mentorship', 'professional development', 'employee development', 'personal development', 'professional coach', 'business coach'],
            'Publicly Traded' => ['public company', 'publicly traded company', 'publicly owned'],
            'Regulations' => ['regulations', 'regulate', 'bylaw', 'laws', 'rules', 'rules and regulations'],
            'Research & Development' => ['research', 'R&D', 'r+d', 'RnD', 'RTD', 'research and development', 'research & development', 'product development', 'design and development'],
            'Seed Stage Companies' => ['seed', 'round', 'series', 'seed stage company', 'seed round', 'seed series'],
            'Series A and Above Startups' => ['series A round', 'early stage startup', 'A round'],
            'Small Business' => ['small business', 'at home business', 'small team'],
            'Social Good & Responsibility' => ['sustainability', 'sustainable', 'social good', 'corporate sustainability', 'social responsibility', 'corporate social responsibility', 'socially responsible', 'socially conscious'],
            'Thought Leadership' => ['commentary', 'opinion', 'comment', 'feedback', 'thought leader', 'expert insight', 'expert commentary', 'professional insight', 'expert opinion'],
            'Women\'s Topics' => ['women', 'woman', 'gender', 'maternity', 'female', 'her', 'she', '#metoo', 'female CEO', 'woman\'s topics', 'maternity leave', 'women\'s topics', 'woman CEO', 'equal pay', 'women\'s leadership', 'women of color', '#metoo movement'],
            'Workplace Productivity' => ['workplace', 'productivity', 'efficiency', 'workplace productivity', 'workplace efficiency', 'productivity in the workplace', 'efficiency in the workplace']
        ];
    }
}