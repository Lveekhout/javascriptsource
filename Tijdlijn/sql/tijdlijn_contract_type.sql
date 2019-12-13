set serveroutput on size 1000000 format truncated

declare
   function hash_color(p_str in varchar2) return varchar2 is
   begin
      return substr(dbms_crypto.hash(utl_raw.cast_to_raw(p_str), 1), 1, 6);
   end;

--   procedure kenmerken_ppt(p_ppt_id in number, p_first boolean default true) is
--   l_first   boolean := p_first;
--   begin
--      for ppt in ( select distinct code from pensioenproducten where dct_id = p_dct_id ) loop
--         if l_first then dbms_output.put_line('{'); l_first := false; else dbms_output.put_line(',{'); end if;
--         dbms_output.put_line('naam: "PPT:' || ppt.code || '"');
--         dbms_output.put_line(',kleur: "#' || hash_color('PPT:' || ppt.code) || '"');
--         dbms_output.put_line(',periodes: [');
--         pensioenproducten_dct_(p_dct_id, ppt.code);
--         dbms_output.put_line(']');
--         dbms_output.put_line('}');
--      end loop;
--   end;

   procedure pensioenproducten_dct(p_dct_id in number, p_first boolean default true) is
   l_first   boolean := p_first;
   begin
      for ppt in ( select * from pensioenproducten where dct_id = p_dct_id order by code asc ) loop
         if l_first then dbms_output.put_line('{'); l_first := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('naam: "PPT:' || ppt.code || '"');
         dbms_output.put_line(',kleur: "#' || hash_color('PPT:' || ppt.code) || '"');
         dbms_output.put_line(',periodes: [');
         dbms_output.put_line('{');
         dbms_output.put_line('label: "' || ppt.id || '"');
         dbms_output.put_line(',ingangsdatum: "' || to_char(ppt.ingangsdatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         if ppt.einddatum is not null then
            dbms_output.put_line(',einddatum: "' || to_char(ppt.einddatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         end if;
         dbms_output.put_line('}');
         dbms_output.put_line(']');
         dbms_output.put_line('}');
      end loop;
   end;

   procedure dienstverband_contracten(p_wct_id in number, p_first boolean default true) is
   l_first   boolean := p_first;
   begin
      for dct in ( select * from dienstverband_contracten where wct_id = p_wct_id ) loop
         if l_first then dbms_output.put_line('{'); l_first := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('naam: "DCT"');
         dbms_output.put_line(',kleur: "#' || hash_color('DCT') || '"');
         dbms_output.put_line(',periodes: [{');
         dbms_output.put_line('label: "' || dct.id || '"');
         dbms_output.put_line(',ingangsdatum: "' || to_char(dct.ingangsdatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         if dct.einddatum is not null then
            dbms_output.put_line(',einddatum: "' || to_char(dct.einddatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         end if;
         dbms_output.put_line('}]');
         dbms_output.put_line('}');

         pensioenproducten_dct(dct.id, l_first);
      end loop;
   end;

   procedure werkgever_contracten(p_cte_id in number, p_first boolean default true) is
   l_first   boolean := p_first;
   begin
      for wct in ( select * from werkgever_contracten where cte_id = p_cte_id ) loop
         if l_first then dbms_output.put_line('{'); l_first := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('naam: "WCT"');
         dbms_output.put_line(',kleur: "#' || hash_color('WCT') || '"');
         dbms_output.put_line(',periodes: [{');
         dbms_output.put_line('label: "' || wct.code || '"');
         dbms_output.put_line(',ingangsdatum: "' || to_char(wct.ingangsdatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         if wct.einddatum is not null then
            dbms_output.put_line(',einddatum: "' || to_char(wct.einddatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         end if;
         dbms_output.put_line('}]');
         dbms_output.put_line('}');

         dienstverband_contracten(wct.id, l_first);
      end loop;
   end;

   procedure contract_type(p_first boolean default true) is
   l_first   boolean := p_first;
   begin
      for cte in ( select * from contract_type ) loop
         if l_first then dbms_output.put_line('{'); l_first := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('naam: "CTE"');
         dbms_output.put_line(',kleur: "#' || hash_color('CTE') || '"');
         dbms_output.put_line(',periodes: [{');
         dbms_output.put_line('label: "' || cte.code || '"');
         dbms_output.put_line(',ingangsdatum: "' || to_char(cte.ingangsdatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         if cte.einddatum is not null then
            dbms_output.put_line(',einddatum: "' || to_char(cte.einddatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         end if;
         dbms_output.put_line('}]');
         dbms_output.put_line('}');

         werkgever_contracten(cte.id, l_first);
      end loop;
   end;

begin
   dbms_output.put_line('[');
   contract_type;
   dbms_output.put_line(']');
end;
/